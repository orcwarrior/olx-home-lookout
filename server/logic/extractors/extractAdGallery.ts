import CheerioAPI = cheerio.CheerioAPI;

function extractAdGallery($: CheerioAPI): string[] {
    // @ts-ignore
    const $gallery: any[] = $(".swiper-slide img");
    // @ts-ignore
    const gallery = $gallery.toArray().map(({attribs}) => attribs.href || attribs.src|| attribs["data-src"]);

    return gallery;
}

export {extractAdGallery};
