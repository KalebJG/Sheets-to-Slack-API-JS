function runScriptManually() {
  const sheetId = "Sheet ID Here"; // Replace with your sheet ID
  const webhookUrl = 'Slack Webhook API Here' // Replace with your Slack webhook URL

  const spreadsheet = SpreadsheetApp.openById(sheetId);

  if (!spreadsheet) {
    console.error(`Spreadsheet with ID '${sheetId}' not found.`);
    return;
  }

  const sheet = spreadsheet.getSheets()[0]; // Assuming you want the first sheet

  // Simulate form submission data
  const sampleValues = ["Value 1", "Value 2", "Value 3"]; // Replace with your sample data

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  let message = "*New Google Sheet Row*\n";
  for (let i = 0; i < headers.length; i++) {
    message += `*${headers[i]}*: ${sampleValues[i]}\n`;
  }

  try {
    postToSlack(message, webhookUrl);
  } catch (error) {
    console.error("Error posting to Slack:", error.toString());
  }
}

// The postToSlack function remains unchanged
function postToSlack(message, webhookUrl) {
  if (!webhookUrl) {
    throw new Error("Webhook URL is empty or undefined.");
  }

  const payload = {
    text: message,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  console.log("Webhook URL:", webhookUrl);
  console.log("Options:", options);

  const response = UrlFetchApp.fetch(webhookUrl, options);

  if (response.getResponseCode() !== 200) {
    throw new Error(`Slack API request failed with response code: ${response.getResponseCode()}`);
  }
}