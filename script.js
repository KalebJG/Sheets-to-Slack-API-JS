function runScriptManually() {
  const sheetId = "Replace with Sheet ID"; // Replace with your sheet ID
  const webhookUrl = "Replace with slack webhook"; // Replace with your webhook URL

  const spreadsheet = SpreadsheetApp.openById(sheetId);

  if (!spreadsheet) {
    console.error(`Spreadsheet with ID '${sheetId}' not found.`);
    return;
  }

  const sheet = spreadsheet.getSheets()[0]; // Assuming you want the first sheet

  // Get the last row of the sheet
  const lastRow = sheet.getLastRow();

  // Get values from the last row of columns 1, 2, and 3
  const department = sheet.getRange(lastRow, 1).getValue();
  const departmentId = sheet.getRange(lastRow, 2).getValue();
  const owner = sheet.getRange(lastRow, 3).getValue();

  // Enriched Slack message with additional text
  const slackMessage = `You have a new assignment. Please create the following group\nDepartment: ${department}, Department_ID: ${departmentId}, Owner: ${owner}`;

  try {
    // Post the enriched Slack message
    postToSlack(slackMessage, webhookUrl);
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