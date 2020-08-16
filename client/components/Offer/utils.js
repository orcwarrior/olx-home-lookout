function getBigImage(url) {
  return url.replace(/;s=\d+?x\d+?/, "")
}

function getThumbImage(url) {
  return url.replace(/;s=\d+?x\d+?/, ";s=100x72")
}

export { getBigImage, getThumbImage }
