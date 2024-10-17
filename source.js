function formatNumber(value) {
    // 숫자가 아닌 문자를 제거
    const numericValue = value.replace(/[^0-9]/g, "");
    
    // 숫자를 포맷하여 쉼표 추가
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function showAmounts() {
    const goldAmount = parseInt(document.getElementById("goldAmount").value.replace(/,/g, ""));
    const mesoAmount = parseInt(document.getElementById("mesoAmount").value.replace(/,/g, ""));
    const count = 1;
    const divisor = 100000000; // 1억

    // 결과를 문자열로 만듭니다.
    let resultText = `입력된 <span style="color: #EDD53F;">골드 주화 교환가</span>: ${formatNumber(document.getElementById("goldAmount").value)}메소<br>`;
    resultText += `입력된 <span style="color: #3d5a64;">메소마켓 메소 판매가</span>: ${formatNumber(document.getElementById("mesoAmount").value)}메포<br>`;

    // goldAmount가 0보다 클 경우 나누기 결과를 계산합니다.
    if (goldAmount > 0 && count > 0) {
        const adjustedGoldAmount = goldAmount / divisor; // 골드 주화를 1억으로 나눈 값
        const divisionResult = (3400 / 0.99 / 3).toFixed(0);
        const divMesoResult = (divisionResult / adjustedGoldAmount);
        const amountDifference = Math.round((mesoAmount - divMesoResult) * (gold / 3));   // 차액
        const amountDifferenceRE = Math.round((divMesoResult - mesoAmount) * (gold / 3));   // 차액리버스
        resultText += `<br>계산 결과: ${mesoAmount} ÷ ${adjustedGoldAmount} = ${divisionResult}<br>`;
        resultText += `<span style='color: #EDD53F;'>골드 주화 = ${adjustedGoldAmount.toString()}</span>일 때, 메소 판매 비율은 <span style='color: Red;'>${Math.round(divMesoResult)}메포</span> 이상이어야 한다.<br>`;
        // 비교 결과를 계산하여 출력합니다.
        let comparisonResult;
        if (mesoAmount > divMesoResult) {
            comparisonResult = `<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> > <span style='color: #EDD53F;'>골드 주화 교환가</span><br> 결론 :<span style='color: Green;'> ${amountDifference}메포 이득!</span>`;
        } else if (mesoAmount < divMesoResult) {
            comparisonResult = `<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> < <span style='color: #EDD53F;'>골드 주화 교환가</span><br> 결론 :<span style='color: red;'> ${amountDifferenceRE}메포 손해!</span>`;
        } else {
            comparisonResult = `<span style='color: #3d5a64;'>메소마켓 메소 판매가</span> = <span style='color: #EDD53F;'>골드 주화 교환가</span><br> 결론 : 동일!`;
        }

        // 결과 문자열에 비교 결과와 추가 메시지를 포함합니다.
        resultText += `<br>비교 결과: ${comparisonResult}<br>`;
    
    } else if(count <= 0){
        resultText += `계산할 수 없습니다. <span style="color: #3d5a64;">메소 판매량</span>이 0 혹은 그 이하입니다.`
    
    } else {
        resultText += `계산할 수 없습니다. <span style="color: #EDD53F;">골드 주화 교환가</span> 혹은 <span style="color: #3d5a64;">메소마켓 메소 판매가</span>가 0 이거나 그 이하입니다.`;
    }

    document.getElementById("result").innerHTML = resultText;
}

function updateCountValue(value) {
    document.getElementById("count").value = value; // 슬라이더 값을 count 입력 필드에 반영
}

// 입력 값이 바뀔 때마다 포맷팅 함수 호출
document.getElementById("goldAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});

document.getElementById("mesoAmount").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});

// count 입력에 대해서도 포맷팅 적용
document.getElementById("count").addEventListener("input", function() {
    this.value = formatNumber(this.value.replace(/,/g, ""));
});
let azreward = 0;

function updateCountValue(value) {
    reward = value; // reward 변수에 슬라이더 값을 저장
    azreward = Math.min(value / 20, 500); // azreward 계산 (0~500 범위)
    gold = Math.min(Math.round(value / 166), 60); // gold 계산 (0~60 범위)
    maepo = Math.min(value * 5, 50000); // maepo 계산 (0~50000 범위)
    document.getElementById("rewardLabel").innerText = `${reward} 컨텐츠 포인트\n`; // 슬라이더 값 업데이트
    document.getElementById("azrewardLabel").innerText = `${azreward} 아즈모스 코인\n`;
    document.getElementById("goldLabel").innerText = `${gold} 메이플 골드 주화\n`;
    document.getElementById("maepoLabel").innerText = `${maepo} 메이플 포인트 소모\n`;
}

// 슬라이더 초기화
reward = document.getElementById("countSlider").value; // reward 초기화
document.getElementById("rewardLabel").innerText = `${reward} 컨텐츠 포인트\n`; // 초기값 설정
document.getElementById("azrewardLabel").innerText = `${azreward} 아즈모스 코인\n`;
document.getElementById("goldLabel").innerText = `${gold} 메이플 골드 주화\n`;
document.getElementById("maepoLabel").innerText = `${maepo} 메이플 포인트 소모\n`;