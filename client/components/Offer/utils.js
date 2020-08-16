function getBigImage(url) {
  if (url.includes("/static/map/"))
    return url;
  else
    return url.replace(/;s=\d+?x\d+?/, "")
}

function getThumbImage(url) {
  if (url.includes("/static/map/"))
    return url.replace("/static/map/", "/static/map/thumb_");
  else
    return url.replace(/;s=\d+?x\d+?/, ";s=100x72")
}

export { getBigImage, getThumbImage }
