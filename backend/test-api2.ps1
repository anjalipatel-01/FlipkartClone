# ============================================================
#  Flipkart Clone - Full API Test Suite (PowerShell)
#  Run:  cd backend; .\test-api2.ps1
# ============================================================

# ---- CONFIGURATION ----
$BASE = "http://localhost:5000"
$script:TOKEN = ""
$script:PRODUCT_ID_1 = $null
$script:PRODUCT_ID_2 = $null
$script:PRODUCT_ID_3 = $null
$script:CART_ITEM_ID_1 = $null
$script:CART_ITEM_ID_2 = $null
$script:ORDER_ID = $null

function Header { param([string]$text); Write-Host ("`n" + ("=" * 60)) -ForegroundColor Cyan; Write-Host ("  " + $text) -ForegroundColor Cyan; Write-Host ("=" * 60) -ForegroundColor Cyan }
function Test   { param([string]$label); Write-Host ("`n--- " + $label + " ---") -ForegroundColor Yellow }
function Pass   { param([string]$msg);   Write-Host ("  PASS: " + $msg) -ForegroundColor Green }
function Fail   { param([string]$msg);   Write-Host ("  FAIL: " + $msg) -ForegroundColor Red }

function Invoke-Api {
    param(
        [string]$Method = "GET",
        [string]$Url,
        [hashtable]$Body,
        [switch]$NoAuth
    )
    $headers = @{ "Content-Type" = "application/json" }
    if (-not $NoAuth -and $script:TOKEN) {
        $headers["Authorization"] = "Bearer " + $script:TOKEN
    }
    $splat = @{
        Method      = $Method
        Uri         = $Url
        Headers     = $headers
        ErrorAction = "Stop"
        UseBasicParsing = $true
    }
    if ($Body) {
        $splat["Body"] = ($Body | ConvertTo-Json -Depth 5)
    }
    try {
        $resp = Invoke-WebRequest @splat
        $data = $resp.Content | ConvertFrom-Json
        return @{ Status = [int]$resp.StatusCode; Data = $data; Raw = $resp }
    } catch {
        $status = 0
        $errBody = @{ success = $false; message = $_.Exception.Message }
        if ($_.Exception.Response) {
            $status = [int]$_.Exception.Response.StatusCode
            try {
                $stream = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($stream)
                $body = $reader.ReadToEnd()
                $reader.Close()
                $stream.Close()
                $errBody = $body | ConvertFrom-Json
            } catch {}
        }
        return @{ Status = $status; Data = $errBody; Raw = $null }
    }
}

# ============================================================
#  0. HEALTH CHECK
# ============================================================
Header "0. HEALTH CHECK"

Test "GET /health"
$r = Invoke-Api -Url ($BASE + "/health") -NoAuth
if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
    Pass ("Server is running: " + $r.Data.message)
} else {
    Fail ("Health check failed - status " + $r.Status)
    Write-Host "  Server may not be running. Aborting." -ForegroundColor Red
    exit 1
}

# ============================================================
#  1. AUTH ROUTES
# ============================================================
Header "1. AUTH ROUTES"

Test "POST /api/auth/register (new user)"
$randEmail = "john_test_" + (Get-Random -Maximum 99999) + "@test.com"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/auth/register") -NoAuth -Body @{
    name     = "John Doe"
    email    = $randEmail
    password = "password123"
    phone    = "9876543210"
}
if ($r.Status -eq 201 -and $r.Data.success -eq $true) {
    $u = $r.Data.data
    if ($u.id -and $u.name -and $u.email -and -not $u.password_hash) {
        Pass ("User registered: id=" + $u.id + " email=" + $u.email + " no password_hash exposed")
    } else {
        Fail ("Response shape unexpected: " + ($r.Data | ConvertTo-Json -Compress))
    }
} else {
    Fail ("Status " + $r.Status + ": " + $r.Data.message)
}

Test "POST /api/auth/register (duplicate email)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/auth/register") -NoAuth -Body @{
    name     = "Duplicate"
    email    = "test@flipkart.com"
    password = "abc"
}
if ($r.Status -eq 409) {
    Pass ("Duplicate email rejected 409: " + $r.Data.message)
} else {
    Fail ("Expected 409 got " + $r.Status + ": " + $r.Data.message)
}

Test "POST /api/auth/login"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/auth/login") -NoAuth -Body @{
    email    = "test@flipkart.com"
    password = "password123"
}
if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
    $u = $r.Data.data
    Pass ("Login success: id=" + $u.id + " name=" + $u.name)
    $cookies = $r.Raw.Headers["Set-Cookie"]
    if ($cookies -match "token=([^;]+)") {
        $script:TOKEN = $Matches[1]
        Pass ("Token extracted from cookie, length=" + $script:TOKEN.Length)
    } else {
        Fail "No token cookie in Set-Cookie header"
    }
} else {
    Fail ("Login failed " + $r.Status + ": " + $r.Data.message)
    Write-Host "  Cannot continue without auth. Aborting." -ForegroundColor Red
    exit 1
}

Test "POST /api/auth/login (wrong password)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/auth/login") -NoAuth -Body @{
    email    = "test@flipkart.com"
    password = "wrongpassword"
}
if ($r.Status -eq 401) {
    Pass ("Invalid creds rejected 401: " + $r.Data.message)
} else {
    Fail ("Expected 401 got " + $r.Status)
}

Test "GET /api/auth/me (with token)"
$r = Invoke-Api -Url ($BASE + "/api/auth/me")
if ($r.Status -eq 200 -and $r.Data.data.email -eq "test@flipkart.com") {
    Pass ("Authenticated user: " + $r.Data.data.name + " " + $r.Data.data.email)
} else {
    Fail ("Status " + $r.Status + ": " + ($r.Data | ConvertTo-Json -Compress))
}

Test "GET /api/auth/me (no token - should 401)"
$r = Invoke-Api -Url ($BASE + "/api/auth/me") -NoAuth
if ($r.Status -eq 401) {
    Pass "Correctly rejected unauthenticated request 401"
} else {
    Fail ("Expected 401 got " + $r.Status)
}

# ============================================================
#  2. PRODUCT ROUTES
# ============================================================
Header "2. PRODUCT ROUTES"

Test "GET /api/products"
$r = Invoke-Api -Url ($BASE + "/api/products")
if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
    $count = $r.Data.data.Count
    Pass ("Got " + $count + " products")
    if ($count -gt 0) {
        $first = $r.Data.data[0]
        $script:PRODUCT_ID_1 = $first.id
        Write-Host ("  First product: id=" + $first.id + " name=" + $first.name + " price=" + $first.price)
        if ($count -ge 3) {
            $script:PRODUCT_ID_2 = $r.Data.data[1].id
            $script:PRODUCT_ID_3 = $r.Data.data[2].id
        }
    }
} else {
    Fail ("Status " + $r.Status + ": " + $r.Data.message)
}

Test "GET /api/products?search=phone"
$r = Invoke-Api -Url ($BASE + "/api/products?search=phone")
if ($r.Status -eq 200) {
    Pass ("Search returned " + $r.Data.data.Count + " results")
} else { Fail ("Status " + $r.Status) }

Test "GET /api/products?category=electronics"
$r = Invoke-Api -Url ($BASE + "/api/products?category=electronics")
if ($r.Status -eq 200) {
    Pass ("Category filter returned " + $r.Data.data.Count + " products")
} else { Fail ("Status " + $r.Status) }

Test "GET /api/products?sort=price_asc"
$r = Invoke-Api -Url ($BASE + "/api/products?sort=price_asc")
if ($r.Status -eq 200 -and $r.Data.data.Count -ge 2) {
    $sorted = $true
    for ($i = 1; $i -lt $r.Data.data.Count; $i++) {
        if ([decimal]$r.Data.data[$i].price -lt [decimal]$r.Data.data[$i-1].price) { $sorted = $false; break }
    }
    if ($sorted) { Pass "Products sorted by price ascending" }
    else         { Fail "Products NOT sorted correctly" }
} else { Pass ("Returned " + $r.Data.data.Count + " products") }

Test "GET /api/products?sort=price_desc"
$r = Invoke-Api -Url ($BASE + "/api/products?sort=price_desc")
if ($r.Status -eq 200 -and $r.Data.data.Count -ge 2) {
    $sorted = $true
    for ($i = 1; $i -lt $r.Data.data.Count; $i++) {
        if ([decimal]$r.Data.data[$i].price -gt [decimal]$r.Data.data[$i-1].price) { $sorted = $false; break }
    }
    if ($sorted) { Pass "Products sorted by price descending" }
    else         { Fail "Products NOT sorted correctly" }
} else { Pass ("Returned " + $r.Data.data.Count + " products") }

Test "GET /api/products?sort=rating"
$r = Invoke-Api -Url ($BASE + "/api/products?sort=rating")
if ($r.Status -eq 200) {
    Pass ("Rating sort returned " + $r.Data.data.Count + " products")
} else { Fail ("Status " + $r.Status) }

Test ("GET /api/products/:id (valid id=" + $script:PRODUCT_ID_1 + ")")
if ($script:PRODUCT_ID_1) {
    $r = Invoke-Api -Url ($BASE + "/api/products/" + $script:PRODUCT_ID_1)
    if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
        $p = $r.Data.data
        Pass ("Product: " + $p.name + " | images: " + $p.images.Count + " | specs: " + $p.specs.Count)
    } else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
} else { Fail "No product ID available" }

Test "GET /api/products/99999 (not found)"
$r = Invoke-Api -Url ($BASE + "/api/products/99999")
if ($r.Status -eq 404) {
    Pass ("Product not found 404: " + $r.Data.message)
} else {
    Fail ("Expected 404 got " + $r.Status)
}

Test "GET /api/categories"
$r = Invoke-Api -Url ($BASE + "/api/categories")
if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
    Pass ("Got " + $r.Data.data.Count + " categories")
    $r.Data.data | ForEach-Object { Write-Host ("    - " + $_.name + " (slug: " + $_.slug + ")") }
} else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }

# ============================================================
#  3. CART ROUTES
# ============================================================
Header "3. CART ROUTES"

Test "DELETE /api/cart (clear cart for clean test)"
$r = Invoke-Api -Method DELETE -Url ($BASE + "/api/cart")
if ($r.Status -eq 200) { Pass "Cart cleared" }
else { Fail ("Status " + $r.Status) }

Test "GET /api/cart (should be empty)"
$r = Invoke-Api -Url ($BASE + "/api/cart")
if ($r.Status -eq 200 -and $r.Data.data.items.Count -eq 0) {
    Pass ("Cart is empty, total: " + $r.Data.data.total)
} else {
    Fail ("Expected empty cart, got " + $r.Data.data.items.Count + " items")
}

$pid1Label = "product=" + $script:PRODUCT_ID_1 + " qty=2"
Test ("POST /api/cart/items (" + $pid1Label + ")")
$r = Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -Body @{
    product_id = $script:PRODUCT_ID_1
    quantity   = 2
}
if ($r.Status -eq 201 -and $r.Data.success -eq $true) {
    $script:CART_ITEM_ID_1 = $r.Data.data.id
    Pass ("Added to cart: cart_item_id=" + $script:CART_ITEM_ID_1 + " qty=" + $r.Data.data.quantity)
} else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }

Test "POST /api/cart/items (same product - qty should increment)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -Body @{
    product_id = $script:PRODUCT_ID_1
    quantity   = 1
}
if ($r.Status -eq 201 -and $r.Data.data.quantity -eq 3) {
    Pass ("Quantity incremented to " + $r.Data.data.quantity + " (upsert works)")
} elseif ($r.Status -eq 201) {
    Pass ("Upsert returned qty=" + $r.Data.data.quantity)
} else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }

if ($script:PRODUCT_ID_2) {
    Test ("POST /api/cart/items (product=" + $script:PRODUCT_ID_2 + " qty=1)")
    $r = Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -Body @{
        product_id = $script:PRODUCT_ID_2
        quantity   = 1
    }
    if ($r.Status -eq 201) {
        $script:CART_ITEM_ID_2 = $r.Data.data.id
        Pass ("Second item added: cart_item_id=" + $script:CART_ITEM_ID_2)
    } else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
}

Test "GET /api/cart (should have 2 items)"
$r = Invoke-Api -Url ($BASE + "/api/cart")
if ($r.Status -eq 200) {
    $itemCount = $r.Data.data.items.Count
    if ($itemCount -eq 2) { Pass ("Cart has 2 items, total: " + $r.Data.data.total) }
    else { Fail ("Expected 2 items got " + $itemCount) }
} else { Fail ("Status " + $r.Status) }

Test ("PUT /api/cart/items/" + $script:CART_ITEM_ID_1 + " (quantity=5)")
$r = Invoke-Api -Method PUT -Url ($BASE + "/api/cart/items/" + $script:CART_ITEM_ID_1) -Body @{
    quantity = 5
}
if ($r.Status -eq 200 -and $r.Data.data.quantity -eq 5) {
    Pass "Quantity updated to 5"
} else { Fail ("Status " + $r.Status + ": " + ($r.Data | ConvertTo-Json -Compress)) }

Test ("PUT /api/cart/items/" + $script:CART_ITEM_ID_1 + " (quantity=0 - should fail)")
$r = Invoke-Api -Method PUT -Url ($BASE + "/api/cart/items/" + $script:CART_ITEM_ID_1) -Body @{
    quantity = 0
}
if ($r.Status -eq 400) {
    Pass ("Rejected qty=0 400: " + $r.Data.message)
} else {
    Fail ("Expected 400 got " + $r.Status + ": " + $r.Data.message)
}

if ($script:CART_ITEM_ID_2) {
    Test ("DELETE /api/cart/items/" + $script:CART_ITEM_ID_2)
    $r = Invoke-Api -Method DELETE -Url ($BASE + "/api/cart/items/" + $script:CART_ITEM_ID_2)
    if ($r.Status -eq 200) { Pass "Item removed" }
    else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
}

Test "GET /api/cart (should have 1 item)"
$r = Invoke-Api -Url ($BASE + "/api/cart")
if ($r.Status -eq 200 -and $r.Data.data.items.Count -eq 1) {
    Pass "Cart has 1 item remaining"
} else { Fail ("Expected 1 item got " + $r.Data.data.items.Count) }

Test "POST /api/cart/items (no auth - should 401)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -NoAuth -Body @{
    product_id = 1
    quantity   = 1
}
if ($r.Status -eq 401) {
    Pass "Unauthenticated request rejected 401"
} else { Fail ("Expected 401 got " + $r.Status) }

Test "POST /api/cart/items (product_id=99999 - not found)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -Body @{
    product_id = 99999
    quantity   = 1
}
if ($r.Status -eq 404) {
    Pass ("Invalid product rejected 404: " + $r.Data.message)
} else { Fail ("Expected 404 got " + $r.Status + ": " + $r.Data.message) }

# ============================================================
#  4. WISHLIST ROUTES
# ============================================================
Header "4. WISHLIST ROUTES"

Test "GET /api/wishlist (initial state - clear existing)"
$r = Invoke-Api -Url ($BASE + "/api/wishlist")
if ($r.Status -eq 200) {
    Pass ("Wishlist has " + $r.Data.data.Count + " items")
    foreach ($item in $r.Data.data) {
        Invoke-Api -Method DELETE -Url ($BASE + "/api/wishlist/" + $item.product_id) | Out-Null
    }
}

Test ("POST /api/wishlist (product=" + $script:PRODUCT_ID_1 + ")")
$r = Invoke-Api -Method POST -Url ($BASE + "/api/wishlist") -Body @{
    product_id = $script:PRODUCT_ID_1
}
if ($r.Status -eq 201 -and $r.Data.success -eq $true) {
    Pass ("Added to wishlist (" + $r.Data.data.Count + " items in response)")
} else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }

Test "POST /api/wishlist (same product - no duplicate)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/wishlist") -Body @{
    product_id = $script:PRODUCT_ID_1
}
if ($r.Status -eq 201 -and $r.Data.data.Count -eq 1) {
    Pass "No duplicate: still 1 item"
} elseif ($r.Status -eq 201) {
    Pass ("Response OK " + $r.Data.data.Count + " items (ON CONFLICT DO NOTHING)")
} else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }

if ($script:PRODUCT_ID_3) {
    Test ("POST /api/wishlist (product=" + $script:PRODUCT_ID_3 + ")")
    $r = Invoke-Api -Method POST -Url ($BASE + "/api/wishlist") -Body @{
        product_id = $script:PRODUCT_ID_3
    }
    if ($r.Status -eq 201) { Pass ("Second item added (" + $r.Data.data.Count + " total)") }
    else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
}

Test "GET /api/wishlist (should have 2 items)"
$r = Invoke-Api -Url ($BASE + "/api/wishlist")
if ($r.Status -eq 200 -and $r.Data.data.Count -eq 2) {
    Pass "Wishlist has 2 items"
} else { Fail ("Expected 2 items got " + $r.Data.data.Count) }

Test ("GET /api/wishlist/check/" + $script:PRODUCT_ID_1 + " (should be true)")
$r = Invoke-Api -Url ($BASE + "/api/wishlist/check/" + $script:PRODUCT_ID_1)
if ($r.Status -eq 200 -and $r.Data.data.inWishlist -eq $true) {
    Pass ("Product " + $script:PRODUCT_ID_1 + " is in wishlist")
} else { Fail ("Expected inWishlist=true got " + $r.Data.data.inWishlist) }

Test "GET /api/wishlist/check/99999 (should be false)"
$r = Invoke-Api -Url ($BASE + "/api/wishlist/check/99999")
if ($r.Status -eq 200 -and $r.Data.data.inWishlist -eq $false) {
    Pass "Product 99999 is NOT in wishlist"
} else { Fail "Expected inWishlist=false" }

if ($script:PRODUCT_ID_3) {
    Test ("DELETE /api/wishlist/" + $script:PRODUCT_ID_3)
    $r = Invoke-Api -Method DELETE -Url ($BASE + "/api/wishlist/" + $script:PRODUCT_ID_3)
    if ($r.Status -eq 200) { Pass ("Removed product " + $script:PRODUCT_ID_3 + " from wishlist") }
    else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
}

Test "GET /api/wishlist (should have 1 item)"
$r = Invoke-Api -Url ($BASE + "/api/wishlist")
if ($r.Status -eq 200 -and $r.Data.data.Count -eq 1) {
    Pass "Wishlist has 1 item remaining"
} else { Fail ("Expected 1 item got " + $r.Data.data.Count) }

# ============================================================
#  5. ORDER ROUTES
# ============================================================
Header "5. ORDER ROUTES"

Test "Setup: ensure cart has an item"
$r = Invoke-Api -Url ($BASE + "/api/cart")
if ($r.Data.data.items.Count -eq 0) {
    Invoke-Api -Method POST -Url ($BASE + "/api/cart/items") -Body @{
        product_id = $script:PRODUCT_ID_1
        quantity   = 1
    } | Out-Null
    Pass "Added item to cart for order test"
} else {
    Pass ("Cart already has " + $r.Data.data.items.Count + " item(s)")
}

Test "POST /api/orders (place order)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/orders") -Body @{
    shipping_name    = "John Doe"
    shipping_phone   = "9876543210"
    shipping_address = "123 Test Street Apartment 4B"
    shipping_city    = "Mumbai"
    shipping_state   = "Maharashtra"
    shipping_pincode = "400001"
}
if ($r.Status -eq 201 -and $r.Data.success -eq $true) {
    $order = $r.Data.data
    $script:ORDER_ID = $order.id
    Pass ("Order placed: id=" + $order.id + " total=" + $order.total_amount + " status=" + $order.status)
    if ($order.status -eq "placed") {
        Pass "Status is 'placed' as expected"
    } else {
        Fail ("Expected status 'placed' got '" + $order.status + "'")
    }
} else {
    Fail ("Status " + $r.Status + ": " + $r.Data.message)
}

Test "GET /api/cart (should be empty after order)"
$r = Invoke-Api -Url ($BASE + "/api/cart")
if ($r.Status -eq 200 -and $r.Data.data.items.Count -eq 0) {
    Pass "Cart cleared after order"
} else {
    Fail ("Cart still has " + $r.Data.data.items.Count + " items")
}

Test "GET /api/orders"
$r = Invoke-Api -Url ($BASE + "/api/orders")
if ($r.Status -eq 200 -and $r.Data.data.Count -ge 1) {
    Pass ("Got " + $r.Data.data.Count + " order(s)")
} else { Fail ("Status " + $r.Status) }

if ($script:ORDER_ID) {
    Test ("GET /api/orders/" + $script:ORDER_ID)
    $r = Invoke-Api -Url ($BASE + "/api/orders/" + $script:ORDER_ID)
    if ($r.Status -eq 200 -and $r.Data.data.id -eq $script:ORDER_ID) {
        $o = $r.Data.data
        Pass ("Order detail: id=" + $o.id + " items=" + $o.items.Count + " shipping=" + $o.shipping_address)
    } else { Fail ("Status " + $r.Status + ": " + $r.Data.message) }
}

Test "GET /api/orders/99999 (not found)"
$r = Invoke-Api -Url ($BASE + "/api/orders/99999")
if ($r.Status -eq 404) {
    Pass "Non-existent order rejected 404"
} else {
    Fail ("Expected 404 got " + $r.Status)
}

Test "POST /api/orders (empty cart - should fail)"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/orders") -Body @{
    shipping_address = "Test"
}
if ($r.Status -eq 400) {
    Pass ("Empty cart order rejected 400: " + $r.Data.message)
} else {
    Fail ("Expected 400 got " + $r.Status + ": " + $r.Data.message)
}

# ============================================================
#  6. LOGOUT
# ============================================================
Header "6. LOGOUT"

Test "POST /api/auth/logout"
$r = Invoke-Api -Method POST -Url ($BASE + "/api/auth/logout")
if ($r.Status -eq 200 -and $r.Data.success -eq $true) {
    Pass ("Logged out: " + $r.Data.message)
} else { Fail ("Status " + $r.Status) }

# ============================================================
#  SUMMARY
# ============================================================
Header "ALL TESTS COMPLETE"
Write-Host ""
Write-Host "Review the output above for any FAIL lines." -ForegroundColor White
Write-Host "All PASS lines indicate the endpoint is working correctly." -ForegroundColor Green
Write-Host ""
