import {bufferedHandler, HandlerArgs} from "../utils";
import {recalculateOfferComputedFields} from "@db/logic/recalculateOfferComputedFields";
import {getMapImagesForOffer} from "@api/geo/generateOfferMapImages";
import knexClient from "@root/knexClient";
import {OfferDetailed} from "@logic/helpers/Offer";
import {Offer} from "@db/schemas";

const UPDATE_Offers = bufferedHandler(async (data: HandlerArgs<any>) => {

    const offerId = data?.new?.id;
    const hasStreetChanged = _streetChanged(data);
    const hasRankChanged = _rankAffectingFieldChanged(data);

    console.log(`Offer updated: ${offerId}`, {hasStreetChanged, hasRankChanged});
    if (hasStreetChanged) {
        const mapImages = await getMapImagesForOffer(data.new);
        // console.log(`mapImages: `, mapImages);
        const hasExactAddress = !!mapImages.street;
        await knexClient<Offer>("Offers")
            .where({id: offerId})
            .update({
                mapFarImg: mapImages.far?.img,
                mapCloseImg: mapImages.close?.img,
                mapStreetImg: mapImages.street?.img,
                hasExactAddress
            });
    }
    if (hasRankChanged) {

        const updatedOffer = await recalculateOfferComputedFields(offerId);
    }

    return {
        changes: {
            rank: hasRankChanged,
            street: hasStreetChanged
        }
    };

    function _streetChanged({old, new: _new}: { old?: Offer, new?: Offer }) {
        return old.street !== _new.street;
    }

    function _rankAffectingFieldChanged({old, new: _new}: { old?: any, new?: any }) {
        return old.prices_full !== _new.prices_full || old.attrs_area !== _new.attrs_area;
    }
});

export {UPDATE_Offers};
