const ud = require('urban-dictionary');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Defines an english word')
    .addStringOption((option) =>
      option
        .setName('word')
        .setDescription('The word to define')
        .setRequired(true)
    ),
  async execute(interaction) {
    const word = interaction.options.getString('word');
    var definition = 'wait';

    ud.define(word, (error, results) => {
      if (error) {
        console.log(definition);
        interaction.reply(`mmm... is ${word} even a real word?`);
      } else {
        definition = Object.entries(results[0])[0][1]
          .replaceAll('[', '')
          .replaceAll(']', '');
        console.log(definition);
        interaction.reply(definition);
      }
    });
  },
};
