const renderNewProductPage = (productData) => {
    const productSection = productData
      ? `<br /><div>New product data - ${productData}</div>`
      : "<br /><div>No new products available.</div>";
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Shop - Newest product</title>
      </head>
      <body>
        <h1>Newest product</h1>
        <nav>
          <a href="/">Home</a><br />
          <a href="/product/add">Add product</a><br />
          <a href="/logout">Logout</a>
        </nav>
        ${productSection}
      </body>
      </html>
    `;
  };
  
  module.exports = renderNewProductPage;
  