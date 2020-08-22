import React from "react";
import Head from 'next/head'

  const css = `
  a {color: #0a0a0a; text-decoration: underline;} 
  @media (max-width: 480px) {
    #u_content_button_7.v-padding {padding: 10px 20px !important;} #u_content_button_8 .v-padding {padding: 10px 20px !important;} #u_content_button_4 .v-size-width {width: auto !important;} #u_content_button_4 .v-size-max-width {max-width: 100% !important;} #u_content_button_4 .v-padding {padding: 10px 20px !important;}}
     body {
        margin: 0;
        padding: 0;
     }

      table,
      tr,
      td {
      vertical-align: top;
      border-collapse: collapse;
    }

      p {
      margin: 0;
    }

      .ie-container table,
      .mso-container table {
      table-layout: fixed;
    }

      * {
      line-height: inherit;
    }

      a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
      line-height: 100%;
    }

      [owa] .email-row .email-col {
      display: table-cell;
      float: none !important;
      vertical-align: top;
    }

      .ie-container .email-col-100,
      .ie-container .email-row,
      [owa] .email-col-100,
      [owa] .email-row {
      width: 600px !important;
    }
      .ie-container .email-col-17,
      [owa] .email-col-17 {
      width: 102.00000000000001px !important;
    }
      .ie-container .email-col-25,
      [owa] .email-col-25 {
      width: 150px !important;
    }
      .ie-container .email-col-33,
      [owa] .email-col-33 {
      width: 198px !important;
    }
      .ie-container .email-col-50,
      [owa] .email-col-50 {
      width: 300px !important;
    }
      .ie-container .email-col-67,
      [owa] .email-col-67 {
      width: 402px !important;
    }

      @media only screen and (min-width: 620px) {
      .email-row {
      width: 600px !important;
    }
      .email-row .email-col {
      vertical-align: top;
    }
      .email-row .email-col-100 {
      width: 600px !important;
    }
      .email-row .email-col-67 {
      width: 402px !important;
    }
      .email-row .email-col-50 {
      width: 300px !important;
    }
      .email-row .email-col-33 {
      width: 198px !important;
    }
      .email-row .email-col-25 {
      width: 150px !important;
    }
      .email-row .email-col-17 {
      width: 102.00000000000001px !important;
    }
    }

      @media (max-width: 620px) {
      .email-row-container {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
      .email-row .email-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
      .email-row {
      width: calc(100% - 40px) !important;
    }
      .email-col {
      width: 100% !important;
    }
      .email-col > div {
      margin: 0 auto;
    }
      .no-stack .email-col {
      min-width: 0 !important;
      display: table-cell !important;
    }
      .no-stack .email-col-50 {
      width: 50% !important;
    }
      .no-stack .email-col-33 {
      width: 33% !important;
    }
      .no-stack .email-col-67 {
      width: 67% !important;
    }
      .no-stack .email-col-25 {
      width: 25% !important;
    }
      .no-stack .email-col-17 {
      width: 17% !important;
    }
    }

      @media (max-width: 480px) {
      .hide-mobile {
      display: none !important;
      max-height: 0px;
      overflow: hidden;
    }
    
      .mob-fill-h {
        max-width: 100% !important;
      }
    }

      @media (min-width: 481px) {
      .hide-desktop {
      display: none !important;
      max-height: none !important;
    }
    
      .desk-img-fit {
        max-height: 130px;
        object-fit: cover;
      }
    
      .desk-h-pad{
        padding: 10px 0;
      }
    }
  `
const officeMarkup = `
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
`
const EmailHtmlHead = () => {
  return <Head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="x-apple-disable-message-reformatting"/>
    {/*<!--[if !mso]><!-->*/}
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    {/*<![endif]-->*/}

    <style type="text/css" id="email-styles" dangerouslySetInnerHTML={{__html: css}} />

    {/*<!--[if gte mso 9]>*/}
    {/*<xml dangerouslySetInnerHTML ={{__html: officeMarkup}}>*/}
    {/*</xml>*/}
    {/*<![endif]-->*/}
  </Head>
}

export { EmailHtmlHead }
