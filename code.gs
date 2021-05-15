//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
  var myData             = JSON.parse([e.postData.contents]);
  var order_number       = myData.number;
  var order_created      = myData.date_created;
  var order_status       = myData.status;
  var created_via        = myData.created_via;
  var product_name       = myData.line_items[0].name;
  var product_qty        = myData.line_items[0].quantity;
  var product_total      = myData.line_items[0].total;
  var order_total        = myData.total;
  var billing_email      = myData.billing.email;
  var billing_first_name = myData.billing.first_name;
  var billing_last_name  = myData.billing.last_name;
  var billing_name       = billing_last_name + " " + billing_first_name;
  var payment_method     = myData.payment_method_title;
  var shipping_method    = myData.shipping_lines[0].method_title;
  var shipping_total     = myData.shipping_lines[0].total;
  
  var timestamp = new Date();
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i in myData.line_items){
    if (i == 0) {
    sheet.appendRow([order_number,myData.line_items[i].name,myData.line_items[i].quantity,order_created,order_total,billing_name, billing_email, payment_method,shipping_method,order_status,created_via]);
} else {
    sheet.appendRow([order_number,myData.line_items[i].name,myData.line_items[i].quantity,"--","--","--", "--","--","--","--"]);
}
}
}
