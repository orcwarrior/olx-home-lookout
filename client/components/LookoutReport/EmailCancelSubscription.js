import React from "react";
import { withOfferLogic } from "@components/Offer/OfferCard/withOfferLogic";
import { OfferImg, OfferImgsWrap } from "@components/LookoutReport/EmailOffer.subs";

const EmailCancelSubscription = (props) => {

  return <div className="email-row-container" style={{padding: '10px', backgroundColor: '#fee715'}}>
    <div style={{
      margin: '0 auto',
      minWidth: '320px',
      maxWidth: '600px',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      backgroundColor: 'transparent'
    }} className="email-row">
      <div
          style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
        {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-color: #fee715;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
        {/*[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
        <div className="email-col email-col-100"
             style={{maxWidth: '320px', minWidth: '600px', display: 'table-cell', verticalAlign: 'top'}}>
          <div style={{width: '100% !important'}}>
            {/*[if (!mso)&(!IE)]><!*/}
            <div style={{
              padding: '0px',
              borderTop: '0px solid transparent',
              borderLeft: '0px solid transparent',
              borderRight: '0px solid transparent',
              borderBottom: '0px solid transparent'
            }}>{/*<![endif]*/}
              <table id="u_content_text_12" className="u_content_text"
                     style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                     cellSpacing={0} width="100%" border={0}>
                <tbody>
                <tr>
                  <td style={{
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    padding: '15px',
                    fontFamily: '"Montserrat",sans-serif'
                  }} align="left">
                    <div className="v-text-align" style={{
                      color: '#111111',
                      lineHeight: '130%',
                      textAlign: 'center',
                      wordWrap: 'break-word'
                    }}>
                      <div><span style={{fontSize: '32px', lineHeight: '41.6px'}}>GETTING ANNOYED?</span></div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table id="u_content_button_4" className="u_content_button"
                     style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                     cellSpacing={0} width="100%" border={0}>
                <tbody>
                <tr>
                  <td style={{
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    padding: '20px',
                    fontFamily: '"Montserrat",sans-serif'
                  }} align="left">
                    <div className="v-text-align" align="center">
                      {/*[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:52px; v-text-anchor:middle; width:294px;" arcsize="71%" stroke="f" fillcolor="#111111"><w:anchorlock/><center style="color:#ecf0f1;font-family:'Montserrat',sans-serif;"><![endif]*/}
                      <a href target="_blank" className="v-size-width" style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        fontFamily: '"Montserrat",sans-serif',
                        textDecoration: 'none',
                        WebkitTextSizeAdjust: 'none',
                        textAlign: 'center',
                        color: '#ecf0f1',
                        backgroundColor: '#111111',
                        borderRadius: '37px',
                        WebkitBorderRadius: '37px',
                        MozBorderRadius: '37px',
                        width: 'auto',
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        wordWrap: 'break-word',
                        msoBorderAlt: 'none'
                      }}>
                                <span className="v-padding"
                                      style={{display: 'block', padding: '10px 25px', lineHeight: '160%'}}><span
                                    style={{fontSize: '20px', lineHeight: '32px'}}>CANCEL SUBSCRIPTION</span></span>
                      </a>
                      {/*[if mso]></center></v:roundrect></td></tr></table><![endif]*/}
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              {/*[if (!mso)&(!IE)]><!*/}</div>
            {/*<![endif]*/}
          </div>
        </div>
        {/*[if (mso)|(IE)]></td><![endif]*/}
        {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
      </div>
    </div>
  </div>

}

export { EmailCancelSubscription }
