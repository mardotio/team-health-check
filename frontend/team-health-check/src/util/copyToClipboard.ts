const copyToClipboard = async (text: string) =>
  navigator.clipboard.writeText(text);

export default copyToClipboard;
