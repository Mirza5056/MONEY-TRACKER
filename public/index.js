document.addEventListener('DOMContentLoaded',function(){
    var x=document.getElementById("transcation-table").rows.length;
    const noDataMsg=document.getElementById('no-data-msg');
    const tableBody=document.getElementById('table-body');
    let index=0;
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
            const data={
                selector : type,
                amount,
                info,
                dateFormat :  date
            };
            try
            {
                fetch('/addData',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                }).then((response)=> {
                    response.json();
                }).then((data)=>{
                    console.log(data);
                    alert('Successfully Inserted In Database');
                }).catch((err)=> {
                    console.log(err);
                });
            }catch(error) {
                console.log(error);
            }
            document.getElementById('amount').value=' ';
            document.getElementById('type').value=' ';
            document.getElementById('date').value=' ';
            document.getElementById('info').value=' ';
            index++;
        }
        else {
            alert('Please Fill Form Correctly');
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