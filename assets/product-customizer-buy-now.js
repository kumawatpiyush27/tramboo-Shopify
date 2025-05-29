// Adds both the current product and the customizer product to cart, then redirects to checkout
function buyNowWithCustomizer(currentVariantId, customizerProductHandle) {
  // Step 1: Add current product
  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: currentVariantId, quantity: 1 })
  })
  .then(function(res) { return res.json(); })
  .then(function() {
    // Step 2: Add customizer product
    fetch('/products/' + customizerProductHandle + '.js')
      .then(function(res) { return res.json(); })
      .then(function(product) {
        var customizerVariantId = product.variants[0].id;
        return fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: customizerVariantId, quantity: 1 })
        });
      })
      .then(function() {
        window.location.href = '/checkout';
      });
  });
}
