# BotForDealForger

## Overview

BotForDealForger is a Node.js application designed to monitor item availability on a specified website and notify users via Discord when new items are found. It periodically checks for updates and sends alerts for any new items that appear.

It was also vibe coded as f\*\*\*

## Features

- **Automated Monitoring**: Periodically checks a specified URL for new items.
- **Discord Notifications**: Sends a message to a Discord channel when new items are detected.
- **JSON Response Handling**: Compares current and previous responses to identify new items.

## Installation

To install and set up this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BotForDealForger.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BotForDealForger
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   ITEM_URL=your_item_url_here
   DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
   ```

## Usage

To start the bot, run the following command:

```bash
node index.js
```

The bot will check for new items every 30 minutes and send a notification to the specified Discord channel if any are found.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact Svit Dolenc at svit.dolenc1@gmail.com
