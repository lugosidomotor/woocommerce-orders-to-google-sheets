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
  var order_total        = myData.total;
  var billing_first_name = myData.billing.first_name;
  var billing_last_name  = myData.billing.last_name;
  var billing_name       = billing_last_name + " " + billing_first_name;

  try {
    var billing_email      = myData.billing.email;
  } catch (error) {
    var billing_email      = "Nincs e-mail megadva";
  }

  try {
    var payment_method     = myData.payment_method_title;
  } catch (error) {
    var payment_method     = "Nincs fizetési mód megadva";
  }

  try {
    var shipping_method    = myData.shipping_lines[0].method_title;
    var shipping_total     = myData.shipping_lines[0].total;
  } catch (error) {
    var shipping_method    = "Nincs szállítási mód megadva";
    var shipping_total     = "Nincs szállítási mód megadva";
  }
  
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
