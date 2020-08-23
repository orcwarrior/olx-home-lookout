import {Offer} from "@db/schemas";
import {bufferedHandler, HandlerArgs} from "../utils";
import {recalculateOfferComputedFields} from "@db/logic/recalculateOfferComputedFields";
import {getMapImagesForOffer} from "@api/geo/generateOfferMapImages";
import knexClient from "@root/knexClient";

const UPDATE_Offers = bufferedHandler(async (data: HandlerArgs<Offer>) => {

    const offerId = data?.new?.id;
    const hasStreetChanged = _streetChanged(data);
    const hasRankChanged = _rankAffectingFieldChanged(data);

    if (hasStreetChanged) {
        const mapImages = await getMapImagesForOffer(data.new);
        await knexClient<Offer>("Offers")
            .update({
                mapFarImg: mapImages.far.img,
                mapCloseImg: mapImages.close.img,
                mapStreetImg: mapImages.street.img
            });
    }
    if (hasRankChanged)
        await recalculateOfferComputedFields(offerId);

    return {
        changes: {
            rank: hasRankChanged,
            street: hasStreetChanged
        }
    };

    function _streetChanged({old, new: _new}: { old?: Offer, new?: Offer }) {
        return old.street !== _new.street;
    }

    function _rankAffectingFieldChanged({old, new: _new}: { old?: Offer, new?: Offer }) {
        return old.prices.full !== _new.prices.full || old.attrs.area !== _new.attrs.area;
    }
});

export {UPDATE_Offers};
