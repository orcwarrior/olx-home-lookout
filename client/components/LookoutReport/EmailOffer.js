import React from "react";
import { withOfferLogic } from "@components/Offer/OfferCard/withOfferLogic";
import { OfferImg, OfferImgsWrap } from "@components/LookoutReport/EmailOffer.subs";


const _EmailOfferEven = (offer) => {
  const {
    title, url, district, street,
    mainImg,
    prices_full,
    attrs_rooms, attrs_area,
  } = offer;
  console.log(`offer: `, offer);
  const {
    dbId, galleryImgs,
    meterTxtPriceDeviation, meterTxtColor,
    locationIcon,
  } = offer.logic;
  const prices_perM2 = offer.prices_perM2.toFixed(1);
  const indicators_deal = offer.indicators_deal.toFixed(1);
  const indicators_comfort = offer.indicators_comfort.toFixed(0);
  const rank = offer.rank.toFixed(0);
  const emailGalleryRow1 = galleryImgs.slice(1, 5).map(({original}) => original);
  const emailGalleryRow2 = galleryImgs.slice(5, 9).map(({original}) => original);
  const homeLookoutUrl = (process.browser) ? `${location.origin}/lookout/offer/${dbId}` : "";

  return <div style={{backgroundColor: '#222222'}}>
    <div className="email-row-container" style={{padding: '0px 10px'}}>
      <div style={{
        margin: '0 auto',
        minWidth: '320px',
        maxWidth: '600px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        backgroundColor: 'transparent'
      }} className="email-row">
        <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
          {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: #222222;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
          {/*[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-50"
               style={{maxWidth: '320px', minWidth: '300px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_image_9" className="u_content_image"
                       style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                       cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '0px 0px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                        <tbody>
                        <tr>
                          <td style={{paddingRight: '0px', paddingLeft: '0px'}} align="center">
                            <a href={homeLookoutUrl} target="_blank">
                              <img align="center" border={0} src={mainImg} alt="Image" title="Image" style={{
                                outline: 'none',
                                textDecoration: 'none',
                                msInterpolationMode: 'bicubic',
                                clear: 'both',
                                display: 'block !important',
                                border: 'none',
                                height: 'auto',
                                float: 'none',
                                width: '100%',
                                maxWidth: '286px'
                              }} width={286} className="v-src-width v-src-max-width mob-fill-h desk-h-pad"/>
                            </a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  </tbody>
                </table>
                {/*[if (!mso)&(!IE)]><!*/}</div>
              {/*<![endif]*/}
            </div>
          </div>
          {/*[if (mso)|(IE)]></td><![endif]*/}
          {/*[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-50"
               style={{maxWidth: '320px', minWidth: '300px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_text_25" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '20px 10px 7px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ffffff', lineHeight: '130%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{fontSize: '14px', lineHeight: '130%'}}><strong><span style={{
                          fontSize: '18px',
                          lineHeight: '23.4px'
                        }}>{title}</span></strong>
                        </p>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_html_1" className="u_content_html" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '0px 10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div>
                                    <span style={{color: '#2dc2a3', fontSize: '20px', fontWeight: 600}}>{prices_full}zł
                                    </span></div>
                      <div style={{
                        display: 'inline-block',
                        float: 'right',
                        marginTop: '6px',
                        fontSize: '10px',
                        fontWeight: 400,
                        color: '#FFF'
                      }}>
                        {attrs_rooms} pokoje &nbsp;|&nbsp; {attrs_area}m² &nbsp;|&nbsp; {prices_perM2}zł/m²
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_text_31" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '6px 10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ecf0f1', lineHeight: '140%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{fontSize: '14px', lineHeight: '140%'}}>
                          <em>{locationIcon} {district}{street ? `, ${street}` : ""}</em></p>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_text_29" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ecf0f1', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{fontSize: '14px', lineHeight: '100%', textAlign: 'center'}}><span
                            style={{
                              fontSize: '16px',
                              lineHeight: '16px'
                            }}>⭐: {rank} | 🤑: {indicators_deal} | 💺: {indicators_comfort} | 💸 <span
                            style={{color: meterTxtColor}}>{meterTxtPriceDeviation}%</span></span>
                        </p>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_button_5" className="u_content_button hide-mobile"
                       style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                       cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align" align="center">
                        {/*[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.pl" style="height:34px; v-text-anchor:middle; width:280px;" arcsize="12%" stroke="f" fillcolor="#2dc2a3"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]*/}

                        <a href={url} target="_blank" className="v-size-width" style={{
                          boxSizing: 'border-box',
                          display: 'inline-block',
                          fontFamily: '"Montserrat",sans-serif',
                          textDecoration: 'none',
                          WebkitTextSizeAdjust: 'none',
                          textAlign: 'center',
                          color: '#FFFFFF',
                          backgroundColor: '#2dc2a3',
                          borderRadius: '4px',
                          WebkitBorderRadius: '4px',
                          MozBorderRadius: '4px',
                          width: '100%',
                          maxWidth: '100%',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                          wordWrap: 'break-word',
                          msoBorderAlt: 'none',
                          borderTopWidth: '0px',
                          borderTopStyle: 'solid',
                          borderTopColor: '#CCC',
                          borderLeftWidth: '0px',
                          borderLeftStyle: 'solid',
                          borderLeftColor: '#CCC',
                          borderRightWidth: '0px',
                          borderRightStyle: 'solid',
                          borderRightColor: '#CCC',
                          borderBottomWidth: '0px',
                          borderBottomStyle: 'solid',
                          borderBottomColor: '#CCC'
                        }}>
                          <span className="v-padding"
                                style={{display: 'block', padding: '10px 20px', lineHeight: '100%'}}><strong><span
                              style={{fontSize: '14px', lineHeight: '14px'}}>SEE OFFER</span></strong></span>
                        </a>
                        {/*[if mso]></center></v:roundrect></td></tr></table><![endif]*/}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                {/*[if (!mso)&(!IE)]><!*/}
              </div>
              {/*<![endif]*/}
            </div>
          </div>
          {/*[if (mso)|(IE)]></td><![endif]*/}
          {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
        </div>
      </div>
    </div>
    <div className="email-row-container" style={{padding: '0px', backgroundColor: '#222222'}}>
      <OfferImgsWrap>
        {emailGalleryRow1.map(img => <OfferImg imgSrc={img} key={img}/>)}
      </OfferImgsWrap>
      {emailGalleryRow2.length ? <OfferImgsWrap>
        {emailGalleryRow2.map(img => <OfferImg imgSrc={img} key={img}/>)}
      </OfferImgsWrap> : null}

      <table id="u_content_button_7" className="u_content_button hide-desktop"
             style={{msoHide: 'all', fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
             cellSpacing={0} width="100%" border={0}>
        <tbody>
        <tr>
          <td style={{
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            padding: '20px 25px 50px 25px',
            fontFamily: '"Montserrat",sans-serif'
          }} align="left">
            <div className="v-text-align" align="center">
              {/*[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.pl" style="height:36px; v-text-anchor:middle; width:300px;" arcsize="11%" stroke="f" fillcolor="#2dc2a3"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]*/}
              <a href={url} target="_blank" className="v-size-width" style={{
                boxSizing: 'border-box',
                display: 'inline-block',
                fontFamily: '"Montserrat",sans-serif',
                textDecoration: 'none',
                WebkitTextSizeAdjust: 'none',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: '#2dc2a3',
                borderRadius: '4px',
                WebkitBorderRadius: '4px',
                MozBorderRadius: '4px',
                width: '100%',
                maxWidth: '100%',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
                msoBorderAlt: 'none',
                borderTopWidth: '0px',
                borderTopStyle: 'solid',
                borderTopColor: '#CCC',
                borderLeftWidth: '0px',
                borderLeftStyle: 'solid',
                borderLeftColor: '#CCC',
                borderRightWidth: '0px',
                borderRightStyle: 'solid',
                borderRightColor: '#CCC',
                borderBottomWidth: '0px',
                borderBottomStyle: 'solid',
                borderBottomColor: '#CCC'
              }}>
                <span className="v-padding"
                      style={{display: 'block', padding: '10px 20px', lineHeight: '120%'}}><strong><span
                    style={{fontSize: '14px', lineHeight: '16.8px'}}>SEE OFFER</span></strong></span>
              </a>
              {/*[if mso]></center></v:roundrect></td></tr></table><![endif]*/}
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

  </div>
}

const EmailOfferEven = withOfferLogic(_EmailOfferEven, {skipGrommet: true})


const _EmailOfferOdd = (offer) => {
  const {
    title, url, district, street,
    mainImg,
    prices_full,
    attrs_rooms, attrs_area,
  } = offer;
  const {
    dbId, galleryImgs,
    meterTxtPriceDeviation, meterTxtColor,
    locationIcon,
  } = offer.logic;
  const prices_perM2 = offer.prices_perM2.toFixed(1);
  const indicators_deal = offer.indicators_deal.toFixed(1);
  const indicators_comfort = offer.indicators_comfort.toFixed(0);
  const rank = offer.rank.toFixed(0);
  const emailGalleryRow1 = galleryImgs.slice(1, 5).map(({original}) => original);
  const emailGalleryRow2 = galleryImgs.slice(5, 9).map(({original}) => original);
  const homeLookoutUrl = (process.browser) ? `${location.origin}/lookout/offer/${dbId}` : "";

  return <div style={{backgroundColor: '#111111'}}>
    <div className="email-row-container" style={{padding: '0px 10px'}}>
      <div style={{
        margin: '0 auto',
        minWidth: '320px',
        maxWidth: '600px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        backgroundColor: 'transparent'
      }} className="email-row">
        <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
          <div className="email-col email-col-50"
               style={{maxWidth: '320px', minWidth: '300px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>
                <table id="u_content_text_32" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '20px 10px 7px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ffffff', lineHeight: '130%', textAlign: 'right', wordWrap: 'break-word'}}>
                        <p style={{fontSize: '14px', lineHeight: '130%'}}><span
                            style={{fontSize: '18px', lineHeight: '23.4px'}}><strong>{title}</strong></span>
                        </p></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_html_3" className="u_content_html" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '0px 10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div>
                        <div style={{display: 'block'}}>
                          <div style={{
                            color: '#FEE715',
                            fontSize: '20px',
                            display: 'inline-block',
                            float: 'right',
                            fontWeight: 600
                          }}>
                            {prices_full}zł
                          </div>
                          <div style={{
                            display: 'inline-block',
                            float: 'l',
                            marginTop: '6px',
                            fontSize: '10px',
                            fontWeight: 400,
                            color: '#FFF'
                          }}>
                            {attrs_rooms} pokoje &nbsp;|&nbsp; {attrs_area}m² &nbsp;|&nbsp; {prices_perM2}zł/m²
                          </div>
                          <div/>
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_text_33" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '6px 10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ecf0f1', lineHeight: '140%', textAlign: 'right', wordWrap: 'break-word'}}>
                        <p dir="rtl" style={{fontSize: '14px', lineHeight: '140%'}}><em>{locationIcon} {district}{street ? `, ${street}` : ""}</em></p></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_text_34" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
                       role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align"
                           style={{color: '#ecf0f1', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{fontSize: '14px', lineHeight: '100%', textAlign: 'center'}}>
                          <span style={{
                            fontSize: '16px',
                            lineHeight: '16px'
                          }}>⭐: {rank} | 🤑: {indicators_deal} | 💺: {indicators_comfort} | 💸 <span
                              style={{color: meterTxtColor}}>{meterTxtPriceDeviation}%</span></span>
                        </p></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table id="u_content_button_6" className="u_content_button"
                       style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                       cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '10px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <div className="v-text-align" align="center"><a href={url} target="_blank"
                                                                      className="v-size-width" style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        fontFamily: '"Montserrat",sans-serif',
                        textDecoration: 'none',
                        WebkitTextSizeAdjust: 'none',
                        textAlign: 'center',
                        color: '#111111',
                        backgroundColor: '#fee715',
                        borderRadius: '4px',
                        WebkitBorderRadius: '4px',
                        MozBorderRadius: '4px',
                        width: '100%',
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        wordWrap: 'break-word',
                        msoBorderAlt: 'none',
                        borderTopWidth: '0px',
                        borderTopStyle: 'solid',
                        borderTopColor: '#CCC',
                        borderLeftWidth: '0px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: '#CCC',
                        borderRightWidth: '0px',
                        borderRightStyle: 'solid',
                        borderRightColor: '#CCC',
                        borderBottomWidth: '0px',
                        borderBottomStyle: 'solid',
                        borderBottomColor: '#CCC'
                      }}><span className="v-padding"
                               style={{display: 'block', padding: '10px 20px', lineHeight: '100%'}}><strong><span
                          style={{fontSize: '14px', lineHeight: '14px'}}>SEE OFFER</span></strong></span></a>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="email-col email-col-50"
               style={{maxWidth: '320px', minWidth: '300px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>
                <table id="u_content_image_10" className="u_content_image"
                       style={{fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
                       cellSpacing={0} width="100%" border={0}>
                  <tbody>
                  <tr>
                    <td style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      padding: '0px 7px',
                      fontFamily: '"Montserrat",sans-serif'
                    }} align="left">
                      <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                        <tbody>
                        <tr>
                          <td style={{paddingRight: '0px', paddingLeft: '0px'}} align="center"><a
                              href={homeLookoutUrl} target="_blank"><img align="center" border={0}
                                                                           src={mainImg}
                                                                           alt="Image" title="Image" style={{
                            outline: 'none',
                            textDecoration: 'none',
                            msInterpolationMode: 'bicubic',
                            clear: 'both',
                            display: 'block !important',
                            border: 'none',
                            height: 'auto',
                            float: 'none',
                            width: '100%',
                            maxWidth: '286px'
                          }} width={286} className="v-src-width v-src-max-width"/></a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="email-row-container" style={{padding: '0px', backgroundColor: 'transparent'}}>
       <OfferImgsWrap>
        {emailGalleryRow1.map(img => <OfferImg imgSrc={img} key={img}/>)}
      </OfferImgsWrap>
      {emailGalleryRow2.length ? <OfferImgsWrap>
        {emailGalleryRow2.map(img => <OfferImg imgSrc={img} key={img}/>)}
      </OfferImgsWrap> : null}

      <table id="u_content_button_7" className="u_content_button hide-desktop"
             style={{msoHide: 'all', fontFamily: '"Montserrat",sans-serif'}} role="presentation" cellPadding={0}
             cellSpacing={0} width="100%" border={0}>
        <tbody>
        <tr>
          <td style={{
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            padding: '20px 25px 50px 25px',
            fontFamily: '"Montserrat",sans-serif'
          }} align="left">
            <div className="v-text-align" align="center">
              {/*[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://google.pl" style="height:36px; v-text-anchor:middle; width:300px;" arcsize="11%" stroke="f" fillcolor="#2dc2a3"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]*/}
              <a href={url} target="_blank" className="v-size-width" style={{
                boxSizing: 'border-box',
                display: 'inline-block',
                fontFamily: '"Montserrat",sans-serif',
                textDecoration: 'none',
                WebkitTextSizeAdjust: 'none',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: '#2dc2a3',
                borderRadius: '4px',
                WebkitBorderRadius: '4px',
                MozBorderRadius: '4px',
                width: '100%',
                maxWidth: '100%',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
                msoBorderAlt: 'none',
                borderTopWidth: '0px',
                borderTopStyle: 'solid',
                borderTopColor: '#CCC',
                borderLeftWidth: '0px',
                borderLeftStyle: 'solid',
                borderLeftColor: '#CCC',
                borderRightWidth: '0px',
                borderRightStyle: 'solid',
                borderRightColor: '#CCC',
                borderBottomWidth: '0px',
                borderBottomStyle: 'solid',
                borderBottomColor: '#CCC'
              }}>
                <span className="v-padding"
                      style={{display: 'block', padding: '10px 20px', lineHeight: '120%'}}><strong><span
                    style={{fontSize: '14px', lineHeight: '16.8px'}}>SEE OFFER</span></strong></span>
              </a>
              {/*[if mso]></center></v:roundrect></td></tr></table><![endif]*/}
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

  </div>
}

const EmailOfferOdd = withOfferLogic(_EmailOfferOdd, {skipGrommet: true})

export { EmailOfferOdd, EmailOfferEven }
