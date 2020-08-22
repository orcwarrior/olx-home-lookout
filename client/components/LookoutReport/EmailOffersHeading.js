import React from "react";

const EmailOffersHeading = () => {
  return <div className="email-row-container" style={{padding: '0px', backgroundColor: '#111111'}}>
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
        {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #111111;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
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
              <table id="u_content_text_28" className="u_content_text"
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
                    <div className="v-text-align" style={{
                      color: '#fee715',
                      lineHeight: '140%',
                      textAlign: 'left',
                      wordWrap: 'break-word'
                    }}>
                      <p style={{fontSize: '14px', lineHeight: '140%', textAlign: 'center'}}><strong><span
                          style={{
                            fontSize: '22px',
                            lineHeight: '30.8px',
                            fontFamily: 'Montserrat, sans-serif'
                          }}>Offer Highlights</span></strong>
                      </p>
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

export { EmailOffersHeading }
