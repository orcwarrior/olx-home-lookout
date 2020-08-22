import React from "react";

const EmailRankTrend = () => {
  return <div className="email-row-container" style={{padding: '0px', backgroundColor: 'transparent'}}>
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
        {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
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
              <table id="u_content_text_35" className="u_content_text"
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
                      color: '#2dc2a3',
                      lineHeight: '140%',
                      textAlign: 'left',
                      wordWrap: 'break-word'
                    }}>
                      <p style={{fontSize: '14px', lineHeight: '140%', textAlign: 'center'}}><strong><span
                          style={{
                            fontSize: '22px',
                            lineHeight: '30.8px',
                            fontFamily: 'Montserrat, sans-serif'
                          }}>Offers rank trends</span></strong>
                      </p>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table id="u_content_image_19" className="u_content_image"
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
                    <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                      <tbody>
                      <tr>
                        <td style={{paddingRight: '0px', paddingLeft: '0px'}} align="center">
                          <img align="center" border={0}
                               src="https://math.scholastic.com/content/dam/classroom-magazines/math/issues/2017-18/092517/fake-news-fake-data/MA-092517-FAKENEWS-Popup5.png"
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
                            maxWidth: '580px'
                          }} width={580} className="v-src-width v-src-max-width"/>
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
        {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
      </div>
    </div>
  </div>
}

export { EmailRankTrend }
