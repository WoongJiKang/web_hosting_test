function formatNumber(value) {
    // 숫자를 포맷하여 쉼표 추가
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showAmounts() {
    const goldAmount = parseFloat(document.getElementById("goldAmount").value.replace(/,/g, ""));
    const mesoAmount = parseFloat(document.getElementById("mesoAmount").value.replace(/,/g, ""));
    const comparisonValue = 1144.78;
    const divisor = 100000000; // 1억

    // 결과를 문자열로 만듭니다.
    let resultText = `입력된 <span style="color: #EDD53F;">골드 주화 교환가</span>: ${formatNumber(document.getElementById("goldAmount").value)}메소<br>`;
    resultText += `입력된 <span style="color: #3d5a64;">메소마켓 메소 판매가</span>: ${formatNumber(document.getElementById("mesoAmount").value)}메포<br>`;

    // goldAmount가 0보다 클 경우 나누기 결과를 계산합니다.
    if (goldAmount > 0) {
        const adjustedGoldAmount = goldAmount / divisor; // 골드 주화를 1억으로 나눈 값
        const divisionResult = (comparisonValue / adjustedGoldAmount).toFixed(2); // 소수점 2자리까지 표시

        resultText += `<br>계산 결과: ${comparisonValue} ÷ ${adjustedGoldAmount} = ${divisionResult}<br>`;
        
        // 비교 결과를 계산하여 출력합니다.
        let comparisonResult;
        if (mesoAmount > adjustedGoldAmount) {
            comparisonResult = "<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> > <span style='color: #EDD53F;'>골드 주화 교환가</span><br>";
        } else if (mesoAmount < adjustedGoldAmount) {
            comparisonResult = "<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> < <span style='color: #EDD53F;'>골드 주화 교환가</span><br>";
        } else {
            comparisonResult = "<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> = <span style='color: #EDD53F;'>골드 주화 교환가</span><br>";
        }

        // 결과 문자열에 비교 결과와 추가 메시지를 포함합니다.
        resultText += `비교 결과: ${comparisonResult}<br>`;
        resultText += `<span style='color: #EDD53F;'>골드 주화 = ${formatNumber(adjustedGoldAmount.toString())}</span>일 때, 메소 판매 비율은 <span style='color: Red;'>${divisionResult}메포</span> 이상이어야 한다.`;

    } else {
        resultText += `계산할 수 없습니다. <span style="color: #EDD53F;">골드 주화 교환가</span> 혹은 <span style="color: #3d5a64;">메소마켓 메소 판매가</span>가 0 이거나 그 이하입니다.`;
    }

    document.getElementById("result").innerHTML = resultText; // innerHTML 사용
}

// 입력 값이 바뀔 때마다 포맷팅 함수 호출
document.getElementById("goldAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});

document.getElementById("mesoAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});
