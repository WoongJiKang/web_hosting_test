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
    let resultText = `입력된 골드 주화 교환가: ${formatNumber(document.getElementById("goldAmount").value)}메소\n`;
    resultText += `입력된 메소 판매가: ${formatNumber(document.getElementById("mesoAmount").value)}메포\n`;

    // goldAmount가 0보다 클 경우 나누기 결과를 계산합니다.
    if (goldAmount > 0) {
        const adjustedGoldAmount = goldAmount / divisor; // 골드 주화를 1억으로 나눈 값
        const divisionResult = (comparisonValue / adjustedGoldAmount).toFixed(2); // 소수점 2자리까지 표시
        const comparisonWithMeso = (mesoAmount / adjustedGoldAmount).toFixed(2); // 메소와의 비교 결과

        resultText += `\n계산 결과: ${comparisonValue} ÷ ${mesoAmount} = ${divisionResult}\n`;
        
        // 비교 결과를 계산하여 출력합니다.
        let comparisonResult;
        if (mesoAmount > adjustedGoldAmount) {
            comparisonResult = "메소마켓 메소 판매가 > 골드 주화 교환가\n";
        } else if (mesoAmount < adjustedGoldAmount) {
            comparisonResult = "메소마켓 메소 판매가 < 골드 주화 교환가\n";
        } else {
            comparisonResult = "메소마켓 메소 판매가 = 골드 주화 교환가\n";
        }

        // 결과 문자열에 비교 결과와 추가 메시지를 포함합니다.
        resultText += `\n비교 결과: ${comparisonResult}\n`;
        resultText += `골드 주화 = ${formatNumber(adjustedGoldAmount.toString())}일 때, 메소 판매 비율은 ${divisionResult} 이상이어야 한다.`;

    } else {
        resultText += `계산할 수 없습니다. 골드 주화 교환가가 0이어서는 안됩니다.`;
    }

    document.getElementById("result").innerText = resultText;
}

// 입력 값이 바뀔 때마다 포맷팅 함수 호출
document.getElementById("goldAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});

document.getElementById("mesoAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});
