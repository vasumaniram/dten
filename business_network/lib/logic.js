	/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Close the bidding for a vehicle listing and choose the
 * highest bid that is over the asking price
 * @param {org.dten.model.CloseBidding} closeBidding - the closeBidding transaction
 * @transaction
 */
function closeBidding(closeBidding) {
    var listing = closeBidding.listing;
    console.log('LISTING STATUS :' + listing.status);
    if (listing.state !== 'OPEN') {
        throw new Error('Listing is CLOSED');
    }
    // by default we mark the listing as OPEN
    listing.state = 'OPEN';
    var lowestOffer = null;
    var winner = null;
    var organizer = null;
    if (listing.offers && listing.offers.length > 0) {
        // sort the bids by bidPrice
        listing.offers.sort(function(a, b) {
            return (a.bidPrice - b.bidPrice);
        });
        lowestOffer = listing.offers[0];
        console.log('LOWEST OFFER: ' + lowestOffer.bidPrice)
        console.log('RESERVE PRICE: ' + listing.reservePrice)

        lowestOffer.reservePrice
        if (lowestOffer.bidPrice <= listing.reservePrice) {
            // mark the listing as CLOSED
            listing.state = 'CLOSED';
            winner = lowestOffer.member;
            organizer = listing.tender.organizer;
            // assign the tender to the winner
            listing.tender.winner = winner;
            // clear the offers
            //listing.offers = null;
        }
    }
    return getAssetRegistry('org.dten.model.Tender')
        .then(function(tenderRegistry) {
            // save the tender
            if (lowestOffer) {
                return tenderRegistry.update(listing.tender);
            } else {
                return true;
            }
        })
        .then(function() {
            return getAssetRegistry('org.dten.model.TenderListing')
        })
        .then(function(tenderListingRegistry) {
            // save the tender listing
            return tenderListingRegistry.update(listing);
        })
        .then(function() {
            return getParticipantRegistry('org.dten.model.Organizer')
        })
        .then(function(organizerRegistry) {
            // save the organizer
            if (listing.state == 'CLOSED') {
                return organizerRegistry.update(organizer);
            } else {
                return true;
            }
        })
        .then(function() {
            return getParticipantRegistry('org.dten.model.Member')
        })
        .then(function(memberRegistry) {
            // save the winner
            if (listing.state == 'CLOSED') {
                return memberRegistry.update(winner);
            } else {
                return true;
            }
        });
}

/**
 * Make an Offer for a TenderListing
 * @param {org.dten.model.Offer} offer - the offer
 * @transaction
 */
function makeOffer(offer) {
    var listing = offer.listing;
    if (listing.state !== 'OPEN') {
        throw new Error('Listing is CLOSED');
    }
    if (listing.offers == null) {
        listing.offers = [];
    }
    listing.offers.push(offer);
    return getAssetRegistry('org.dten.model.TenderListing')
        .then(function(tenderListingRegistry) {
            // save the tender listing
            return tenderListingRegistry.update(listing);
        });
}
