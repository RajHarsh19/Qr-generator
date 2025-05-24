import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR image from the entered URL
    const qr_svg = qr.image(url, { type: 'png' });

    // Save the image to file
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Save the user input to a .txt file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL.txt");
    });

    console.log(`QR code generated for: ${url}`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("An error occurred:", error);
    }
  });
