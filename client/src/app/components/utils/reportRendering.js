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

function renderReport() {
    
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

        print('feePaymentSlip');
      });

    

  }
}

export default renderReport