// Configurable: Set this to your actual add-on variant ID
const ADDON_VARIANT_ID = 48603629060404; // Personalization Add-on variant ID

// Adds both the main product (with engraving) and the add-on product in one call
function buyNowWithPersonalization(mainVariantId, engravingName) {
  if (!engravingName || engravingName.trim().length === 0) {
    alert('Please enter a valid engraving name.');
    return;
  }

  const payload = {
    items: [
      {
        id: mainVariantId,
        quantity: 1,
        properties: { 'Engraving Name': engravingName }
      },
      {
        id: ADDON_VARIANT_ID,
        quantity: 1
      }
    ]
  };

  console.log('Sending to /cart/add.js:', payload);

  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(text) {
          throw new Error('Shopify error: ' + text);
        });
      }
      return res.json();
    })
    .then(function(data) {
      console.log('Cart add response:', data);
      window.location.href = '/checkout';
    })
    .catch(function(error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the add-on product: ' + error.message);
    });
}

// Attach event listener to the modal's Buy Now button (if present)
document.addEventListener('DOMContentLoaded', function() {
  var buyNowBtn = document.getElementById('buy-now-custom');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      var engravingInput = document.getElementById('engraving-name');
      var engravingName = engravingInput ? engravingInput.value : '';
      var mainVariantId = window.currentVariantId || null;
      if (!mainVariantId) {
        // Try to get from a data attribute or fallback
        var variantInput = document.querySelector('input[name="id"]');
        if (variantInput) mainVariantId = variantInput.value;
      }
      if (mainVariantId) {
        buyNowWithPersonalization(mainVariantId, engravingName);
      } else {
        alert('No product variant selected.');
      }
    });
  }
});
