import React, { useContext } from "react";
import differenceInHours from "date-fns/differenceInHours"


export const ReportSummary = ({report}) => {


  const {offersSince, createdAt, Offers} = report;
  const timeRange = differenceInHours(new Date(createdAt), new Date(offersSince));

  const offersCount = report.Offers_aggregate.aggregate.count;
  const minRank = Offers.reduce((minRank, {rank}) => Math.min(rank, minRank), Number.MAX_SAFE_INTEGER).toFixed();
  const maxRank = Offers.reduce((maxRank, {rank}) => Math.max(rank, maxRank), Number.MIN_SAFE_INTEGER).toFixed();
  const avgRank = report.avgRank.toFixed();
  const avgRankTrend = report.avgRankTrend.toFixed(1);
  const avgRankTrendColor = avgRankTrend > 0 ? "#00C781" : "#FF4040";

  return <>
    <div className="email-row-container" style={{padding: '0px', backgroundColor: '#111111'}}>
      <div style={{
        margin: '0 auto',
        minWidth: '320px',
        maxWidth: '600px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        backgroundColor: 'transparent'
      }} className="email-row no-stack">
        <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
          {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #111111;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]*/}
          {/*[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-33"
               style={{maxWidth: '320px', minWidth: '200px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_text_19" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
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
                           style={{color: '#ced4d9', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{textAlign: 'right', fontSize: '14px', lineHeight: '100%'}}><span
                            style={{fontSize: '14px', lineHeight: '14px'}}>Time range<br/><br/>Offers</span></p>
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
          {/*[if (mso)|(IE)]><td align="center" width="100" style="width: 100px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-17"
               style={{maxWidth: '320px', minWidth: '100px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_text_23" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
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
                           style={{color: '#ffffff', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{textAlign: 'left', fontSize: '14px', lineHeight: '100%'}}><span
                            style={{fontSize: '14px', lineHeight: '14px'}}>{timeRange}h<br/><br/>{offersCount}</span>
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
          {/*[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-33"
               style={{maxWidth: '320px', minWidth: '200px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_text_21" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
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
                           style={{color: '#ced4d9', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{textAlign: 'right', fontSize: '14px', lineHeight: '100%'}}>Rank<span
                            style={{fontSize: '10px', lineHeight: '10px'}}> (min / avg / max)<br/></span><br/>Avg. rank
                          trend</p>
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
          {/*[if (mso)|(IE)]><td align="center" width="100" style="width: 100px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
          <div className="email-col email-col-17"
               style={{maxWidth: '320px', minWidth: '100px', display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{width: '100% !important'}}>
              {/*[if (!mso)&(!IE)]><!*/}
              <div style={{
                padding: '0px',
                borderTop: '0px solid transparent',
                borderLeft: '0px solid transparent',
                borderRight: '0px solid transparent',
                borderBottom: '0px solid transparent'
              }}>{/*<![endif]*/}
                <table id="u_content_text_24" className="u_content_text" style={{fontFamily: '"Montserrat",sans-serif'}}
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
                           style={{color: '#ffffff', lineHeight: '100%', textAlign: 'left', wordWrap: 'break-word'}}>
                        <p style={{textAlign: 'left', fontSize: '14px', lineHeight: '100%'}}><span
                            style={{fontSize: 'px', lineHeight: '14px'}}><span style={{
                          fontSize: '10px',
                          lineHeight: '10px'
                        }}>{minRank} / {avgRank} / {maxRank}<br/><br/></span>
                          <span style={{color: avgRankTrendColor}}>{Math.abs(Number(avgRankTrend))}%</span>
                        </span>
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
    <div className="email-row-container" style={{padding: '0px', backgroundColor: '#111111'}}>
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
                <table id="u_content_divider_6" className="u_content_divider"
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
                      <table height="0px" align="center" border={0} cellPadding={0} cellSpacing={0} width="100%"
                             style={{
                               borderCollapse: 'collapse',
                               tableLayout: 'fixed',
                               borderSpacing: 0,
                               msoTableLspace: '0pt',
                               msoTableRspace: '0pt',
                               verticalAlign: 'top',
                               borderTop: '1px solid #BBBBBB',
                               msTextSizeAdjust: '100%',
                               WebkitTextSizeAdjust: '100%'
                             }}>
                        <tbody>
                        <tr style={{verticalAlign: 'top'}}>
                          <td style={{
                            wordBreak: 'break-word',
                            borderCollapse: 'collapse !important',
                            verticalAlign: 'top',
                            fontSize: '0px',
                            lineHeight: '0px',
                            msoLineHeightRule: 'exactly',
                            msTextSizeAdjust: '100%',
                            WebkitTextSizeAdjust: '100%'
                          }}>
                            <span>&nbsp;</span>
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
  </>
}
