const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("../src/Lotto");

class App {
  constructor() {
    this.usedMoney = 0;
    this.lottoAmount = 0;
    this.lottoNumbers = [];
    this.winningNumbers = 0;
    this.bonusNumber = 0;
    this.countOfWinningways = [0, 0, 0, 0, 0];
  }

  play() {
    this.buyLotto();
    this.consoleLottoAmount();
    this.getRandomLottoNumbers();
    this.consoleRandomLottoNumbers();
    this.inputWinningNumbers();
    this.inputBonusNumbers();
    this.consoleWinningResult();
  }

  buyLotto() {
    Console.readLine(
      "로또를 구매할 금액을 입력해주세요.",
      (input) => {
        if (input % 1000 != 0)
          throw new Error(
            "[ERROR] 구입 금액은 1000원 단위로만 구매 가능합니다.\n"
          );
        this.usedMoney = input;
        this.lottoAmount = input / 1000;
      }
    );
  }

  consoleLottoAmount() {
    Console.print(this.lottoAmount + "개를 구매했습니다.\n");
  }

  getRandomLottoNumbers() {
    for (let i = 0; i < this.lottoAmount; i++) {
      this.lottoNumbers.push(
        new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6))
      );
    }
  }

  consoleRandomLottoNumbers() {
    for (let i = 0; i < this.lottoAmount; i++) {
      Console.print(this.lottoNumbers[i].getLottoNumbers());
    }
  }

  inputWinningNumbers() {
    Console.readLine("당첨 번호를 입력해 주세요.", (input) => {
      this.winningNumbers = new Lotto(
        input.split(",").map((element) => Number(element))
      );
    });
  }

  inputBonusNumbers() {
    Console.readLine("보너스 번호를 입력해 주세요.", (input) => {
      this.bonusNumber = input;
    });
  }

  consoleWinningResult() {
    for (let i = 0; i < this.lottoAmount; i++) {
      let winningCount = 0;
      for (let j = 0; j < 6; j++) {
        if (
          this.lottoNumbers[i]
            .getLottoNumbersArray()
            .includes(this.winningNumbers.getLottoNumbersArray()[j])
        )
          winningCount++;
      }
      if (
        this.lottoNumbers[i].getLottoNumbersArray().includes(this.bonusNumber) &&
        winningCount == 5
      ) {
        this.countOfWinningways[3]++;
      } 
      else if (winningCount == 3) this.countOfWinningways[0]++;
      else if (winningCount == 4) this.countOfWinningways[1]++;
      else if (winningCount == 5) this.countOfWinningways[2]++;
      else if (winningCount == 6) this.countOfWinningways[4]++;
    }
    Console.print("당첨 통계");
    Console.print("---");
    Console.print("3개 일치 (5,000원) - " + this.countOfWinningways[0] + "개");
    Console.print("4개 일치 (50,000원) - " + this.countOfWinningways[1] + "개");
    Console.print(
      "5개 일치 (1,500,000원) - " + this.countOfWinningways[2] + "개"
    );
    Console.print(
      "5개 일치, 보너스 볼 일치 (30,000,000원) - " +
        this.countOfWinningways[3] +
        "개"
    );
    Console.print(
      "6개 일치 (2,000,000,000원) - " + this.countOfWinningways[4] + "개"
    );
    this.calculateResultPercentage();
  }
}

module.exports = App;