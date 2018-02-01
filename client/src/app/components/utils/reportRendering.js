import LanguageStore from '../i18n/LanguageStore'
//import store from '../../store/configureStore'
//import LoaderActions from '../Loader/LoaderActions'

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import html2canvas from 'html2canvas'
import jsPDF from 'jsPDF'

import * as phrases_us from '../../../assets/api/langs/us.json';
import * as phrases_ar from '../../../assets/api/langs/ar.json';
import * as phrases_ur from '../../../assets/api/langs/ur.json';

let phrasesUs = {}
let phrasesUr = {}
let phrasesAr = {} 

function print(elementName){
    
    //console.log('print(elementName)');
    
    // var pdf = require('html-pdf');
    // pdf.create(html).toStream(function(err, stream){
    //     console.log('.toStream(function(err, stream){');
    //     stream.pipe(fs.createWriteStream('./foo.pdf'));
    //   });
    
      
    //console.log('html2canvas start ');
    
    $("#"+elementName).removeClass('hide');
    html2canvas(document.getElementById(elementName), {
       logging: false,
    //   , onclone: function (document) {
    //     console.log('onclone ..', document);
    //     //$("#feePaymentSlip").show();
    //   }
    }).then(function (canvas) {
      var img = canvas.toDataURL('image/png');
      //var doc = new jsPDF('p', 'cm',  [22, 29]);
      var doc = new jsPDF('p', 'pt', 'a4');
      doc.addImage(img, 'JPEG', 1, 1);
      //doc.save('test.pdf');

      //$('#reportPopup').modal('show');

      //var iframe = document.getElementById('iframeReport'); //document.createElement('iframe');
      //iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:100%');
      //document.body.appendChild(iframe);
      //iframe.src = doc.output('datauristring');  it takes too much time so open in new window option is suitable

      //good solution to open in new window
      window.open(doc.output('bloburl'), '_blank');
      //a.style.display = "none";
      //$("#feePaymentSlip").hide();
      $("#"+elementName).addClass('hide');
    });
}

export function printFeeSlip(langKey, feePaymentId, htmlContent) {

  //console.log('feePaymentId ==> ', feePaymentId, numeral(2324).format('0,0.00'));

  if (feePaymentId) {
    
    alert('i', 'Please wait while report data is loading ...');

    //var htmlContent = this.state.feePaymentSlipTemplate; 

    axios.get('api/FeePayments/FeePaymentByID/' + langKey + '/' + feePaymentId)
      .then(res => {
        var masterData = res.data[0];
        //console.log('res from api/FeePayments/FeePaymentByID/ ', res,  converter.toWords(masterData.TotalPaidAmount));
       
        htmlContent = htmlContent.replace('$SchoolName$', getTranslation('Prime Stars International School'));
        htmlContent = htmlContent.replace('$SchoolAddress$', getTranslation('Al Kharj Saudi Arabia'));
        
        htmlContent = htmlContent.replace('$ReportTitle$', getTranslation('Fee Receipt'));
        htmlContent = htmlContent.replace('$RollNoText$', getTranslation('RollNoText'));
        
        htmlContent = htmlContent.replace('$NameText$', getTranslation('NameText'));
        htmlContent = htmlContent.replace('$BatchText$', getTranslation('BatchText'));
        htmlContent = htmlContent.replace('$ClassText$', getTranslation('ClassText'));
        htmlContent = htmlContent.replace('$SectionText$', getTranslation('SectionText'));
        
        htmlContent = htmlContent.replace('$PaymentCodeText$', getTranslation('PaymentCodeText'));
        htmlContent = htmlContent.replace('$PaymentDateText$', getTranslation('PaymentDateText'));
        htmlContent = htmlContent.replace('$PrintDateText$', getTranslation('PrintDateText'));
        
        htmlContent = htmlContent.replace('$FeeTitleText$', getTranslation('FeeTypeText'));
        htmlContent = htmlContent.replace('$AmountText$', getTranslation('AmountText'));
        htmlContent = htmlContent.replace('$AmountInWordsText$', getTranslation('AmountInWordsText'));
        htmlContent = htmlContent.replace('$TotalAmountText$', getTranslation('TotalPaidAmountText'));
        htmlContent = htmlContent.replace('$PaymentModeText$', getTranslation('PaymentModeText'));
        htmlContent = htmlContent.replace('$BalanceText$', getTranslation('BalanceText'));
        htmlContent = htmlContent.replace('$CommentsText$', getTranslation('CommentsText'));
        
        htmlContent = htmlContent.replace('$PrintedByText$', getTranslation('PrintedByText'));
        htmlContent = htmlContent.replace('$FeeCollectedByText$', getTranslation('FeeCollectedByText'));


        htmlContent = htmlContent.replace('$Batch$', masterData.BatchName);
        htmlContent = htmlContent.replace('$Class$', masterData.ClassName);
        htmlContent = htmlContent.replace('$Section$', masterData.SectionName);
        htmlContent = htmlContent.replace('$RollNo$', masterData.RollNo);
        htmlContent = htmlContent.replace('$Name$', masterData.StudentFullName);
        htmlContent = htmlContent.replace('$PaymentCode$', masterData.FeePaymentCode);
        htmlContent = htmlContent.replace('$PaymentDate$', getDateFrontEndFormat(masterData.PaidOn));
        htmlContent = htmlContent.replace('$PrintDate$', getDateFrontEndFormat(moment()));
        htmlContent = htmlContent.replace('$TotalAmount$', numeral(masterData.TotalPaidAmount).format('0,0.00'));
        htmlContent = htmlContent.replace('$PaymentMode$', masterData.PaymentModeName);
        htmlContent = htmlContent.replace('$Balance$', numeral(masterData.Balance).format('0,0.00'));

        htmlContent = htmlContent.replace('$PrintedBy$', "Zeeshan");
        //htmlContent = htmlContent.replace('$IssuedBy$', "Admin");
        htmlContent = htmlContent.replace('$FeeCollectedBy$', masterData.FeeCollectedBy);
        htmlContent = htmlContent.replace('$ComputerGeneratedDocument$', getTranslation('ComputerGeneratedDocumentText')); 

        htmlContent = htmlContent.replace('$AmountInWords$', converter.toWords(masterData.TotalPaidAmount));
        htmlContent = htmlContent.replace('$Comments$', masterData.Comments);

        var tblRow = '<tr><td>#</td><td>$title$</td><td class="text-right">$amount$</td></tr>';
        var temp = '';
        res.data.forEach(function(element, index){
          temp += tblRow.replace('#', index+1).replace('$title$', element.FeeTypeName).replace('$amount$', numeral(element.PaidAmount).format('0,0.00'));
        });
        
        htmlContent = htmlContent.replace(tblRow, temp);

        if (langKey == 'ar') {
          htmlContent = htmlContent.replace('direction: ltr;', 'direction: rtl;');
          htmlContent = htmlContent.replace('text-right', 'text-left');
        }

        this.setState({ feePaymentSlipTemplate: htmlContent });  // ??????????????????????

        //return htmlContent;       //>>>>?????????????

        //print('feePaymentSlip');
      });

    

  }
}

export default print