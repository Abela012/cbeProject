import crypto from "crypto";
import fs from "fs";
import path from "path";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // Generate a random key
const iv = crypto.randomBytes(16); // Generate a random Initialization Vector (IV)

export async function encryptAndStoreFile(filePath) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const chunks = [];

  return new Promise((resolve, reject) => {
    input.on("data", (chunk) => {
      chunks.push(cipher.update(chunk));
    });

    input.on("end", async () => {
      try {
        chunks.push(cipher.final());

        const encryptedBuffer = Buffer.concat(chunks);

        const result = {
          content: encryptedBuffer,
          key: key.toString("hex"), // Store key as hex string
          iv: iv.toString("hex"), // Store iv as hex string
        };

        resolve(result);
      } catch (error) {
        console.error("Error saving file to MongoDB:", error);
        reject(error);
      }
    });

    input.on("error", (error) => {
      reject(error);
    });
  });
}

// Example usage
// encryptAndStoreFile("path/to/your/image.jpg"); // Replace with your file path

export async function retrieveAndDecryptFile(fileDoc) {
  if (!fileDoc) {
    console.error("File not found");
    return;
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(fileDoc.key, "hex"),
    Buffer.from(fileDoc.iv, "hex")
  );
  const decryptedChunks = [];

  decryptedChunks.push(decipher.update(fileDoc.file));
  decryptedChunks.push(decipher.final());

  const decryptedBuffer = Buffer.concat(decryptedChunks);
  const outputPath = "./temp/" + fileDoc.fileName;

  // Save the decrypted file locally
  fs.writeFile(outputPath, decryptedBuffer, (err) => {
    if (err) {
      console.error("Error writing PDF file");
    }
    // console.error("PDF file created successfully");
  });
  return decryptedBuffer;
}

// Example usage
// retrieveAndDecryptFile("image.jpg"); // Replace with the filename you stored
