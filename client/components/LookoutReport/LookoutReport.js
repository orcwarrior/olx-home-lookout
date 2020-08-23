import React from "react";
import { EmailHeading } from "./EmailHeading";
import { ReportSummary } from "@components/LookoutReport/ReportSummary";
import { EmailOfferEven, EmailOfferOdd } from "@components/LookoutReport/EmailOffer";
import { EmailHtmlHead } from "@components/LookoutReport/EmailHtmlHead";
import { EmailRankTrend } from "@components/LookoutReport/EmailRankTrend";
import { EmailOffersHeading } from "@components/LookoutReport/EmailOffersHeading";
import { EmailCancelSubscription } from "@components/LookoutReport/EmailCancelSubscription";

const LookoutReport = ({report = {}}) => {
  const {Offers = []} = report;

  console.log(`report: `, report);
  return <>
    <EmailHtmlHead/>

    <table className="nl-container" style={{
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      borderSpacing: 0,
      msoTableLspace: '0pt',
      msoTableRspace: '0pt',
      verticalAlign: 'top',
      minWidth: '320px',
      margin: '0 auto',
      backgroundColor: '#000000',
      width: '100%'
    }} cellPadding={0} cellSpacing={0}>
      <tbody>
      <tr style={{verticalAlign: 'top'}}>
        <td style={{wordBreak: 'break-word', borderCollapse: 'collapse !important', verticalAlign: 'top'}}>
          {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #0a0a0a;"><![endif]*/}

          <EmailHeading/>

          <ReportSummary report={report}/>

          <EmailOffersHeading/>


          {Offers.map((offer, idx) => (idx % 2 === 0)
              ? <EmailOfferEven {...offer} key={offer.id} />
              : <EmailOfferOdd {...offer} key={offer.id}/>)}



          <EmailCancelSubscription />
          {/*[if (mso)|(IE)]></td></tr></table><![endif]*/}
        </td>
      </tr>
      </tbody>
    </table>
  </>;
}

export { LookoutReport }
