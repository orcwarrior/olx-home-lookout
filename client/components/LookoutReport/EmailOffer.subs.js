import React from "react";

const OfferImg = ({imgSrc}) => {
  return <>
    {/*[if (mso)|(IE)]><td align="center" width="150" style="width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
    <div className="email-col email-col-25"
         style={{maxWidth: '320px', display: 'table-cell', verticalAlign: 'middle'}}>
        {/*[if (!mso)&(!IE)]><!*/}
        <div style={{
          padding: '0px',
          borderTop: '0px solid transparent',
          borderLeft: '0px solid transparent',
          borderRight: '0px solid transparent',
          borderBottom: '0px solid transparent'
        }}>{/*<![endif]*/}
          <table id="u_content_image_11" className="u_content_image" style={{fontFamily: '"Montserrat",sans-serif'}}
                 role="presentation" cellPadding={0} cellSpacing={0} width="100%" border={0}>
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
                      <img align="center" border={0} src={imgSrc} alt="Image" title="Image" style={{
                        outline: 'none',
                        textDecoration: 'none',
                        msInterpolationMode: 'bicubic',
                        clear: 'both',
                        display: 'block !important',
                        border: 'none',
                        height: 'auto',
                        float: 'none',
                        width: '100%',
                        maxWidth: '130px'
                      }}  className="v-src-width v-src-max-width mob-fill-h desk-img-fit"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
          {/*[if (!mso)&(!IE)]><!*/}
        </div>
        {/*<![endif]*/}
      </div>
    {/*[if (mso)|(IE)]></td><![endif]*/}
  </>
}
const OfferImgsWrap = ({children}) => {
  return <div style={{
    margin: '0 auto',
    minWidth: '320px',
    maxWidth: '600px',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    backgroundColor: 'transparent'
  }} className="email-row">
    <div style={{borderCollapse: 'collapse', display: 'table', width: 'auto', backgroundColor: 'transparent'}}>
      {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #222222;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
      {children}
      {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
    </div>
  </div>
}

export { OfferImg, OfferImgsWrap }
