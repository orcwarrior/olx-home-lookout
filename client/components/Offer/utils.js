function getBigImage(url) {
  return url.replace(";s=644x461", ";s=1000x716")
}

function getThumbImage(url) {
  return url.replace(";s=644x461", ";s=100x72")
}

export { getBigImage, getThumbImage }
