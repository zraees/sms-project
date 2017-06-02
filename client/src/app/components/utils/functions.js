
function mapForCombo(keyValues){
    return keyValues.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
}

export default mapForCombo