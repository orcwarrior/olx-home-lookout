function extractAdGallery($: CheerioAPI): string[] {
    // @ts-ignore
    const $gallery: any[] = $("#descGallery > li > a, .slick-track figure > img");
    // @ts-ignore
    const gallery = $gallery.toArray().map(({attribs}) => attribs.href || attribs.src);

    return gallery;
}

export {extractAdGallery};
