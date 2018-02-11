import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.dten.model{
   export class Tender extends Asset {
      tenderId: string;
      endDate: Date;
      type: TenderType;
      participants: Member[];
      winner: Member;
      organizer: Organizer;
   }
   export enum TenderType {
      PUBLIC,
      PRIVATE,
   }
   export enum ListingStatus {
      OPEN,
      CLOSED,
   }
   export class TenderListing extends Asset {
      listingId: string;
      reservePrice: number;
      description: string;
      state: ListingStatus;
      offers: Offer[];
      tender: Tender;
   }
   export abstract class User extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
      address: string;
      email: string;
      phone: string;
   }
   export class Member extends User {
   }
   export class Organizer extends User {
   }
   export class Auditor extends User {
   }
   export class Offer extends Transaction {
      bidPrice: number;
      listing: TenderListing;
      member: Member;
   }
   export class CloseBidding extends Transaction {
      listing: TenderListing;
   }
// }
