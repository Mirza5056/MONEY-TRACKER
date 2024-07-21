document.addEventListener('DOMContentLoaded',function(){
    var x=document.getElementById("transcation-table").rows.length;
    const noDataMsg=document.getElementById('no-data-msg');
    const tableBody=document.getElementById('table-body');
    function updateDataMessage(){
        if(tableBody.children.length === 0) {
            noDataMsg.style.display='none';
        }
        else {
            noDataMsg.style.display='block';
        }
    }
    document.getElementById('add-button').addEventListener('click',function(){
        var amount=parseFloat(document.getElementById('amount').value);
        var type=document.getElementById('type').value;
        var info=document.getElementById('info').value;
        var date=document.getElementById('date').value;
        var totalText=document.getElementById('total');
        var total=parseFloat(totalText.innerText);
        var index=0;
        if(amount && type && info && date) {
            updateDataMessage();
            var tbody=document.querySelector("#transcation-table tbody");
            var row=document.createElement('tr');
            row.innerHTML=`
            <td>${index+1}</td>
            <td>${info}</td>
            <td>${type}</td>
            <td>${date}</td>
            <td>${amount}</td>
            `;
            //var total_cal=parseFloat(total.textContent);
            //document.getElementById('total').insertAdjacentText('afterbegin',total_cal);
            tbody.appendChild(row);
            if(type === 'income') {
                if(!isNaN(total)) {
                    var total_cal=total+amount;
                    totalText.textContent=total_cal;
                }
            }
            else {
                console.log('expense select');
                var total_cal=total-amount;
                totalText.textContent=total_cal;
            }
            document.getElementById('amount').value=' ';
            document.getElementById('type').value=' ';
            document.getElementById('date').value=' ';
            document.getElementById('info').value=' ';
        }
        else {
        }
    });
    document.getElementById('restore-button').addEventListener('click',function(){
        alert('clciked');
        var tbody=document.querySelector('#transcation-table tbody');
        if(tbody) {
            while(tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
        }
        else {
            console.log('Error Not Data Available');
        }
    });
});