import gameSettings from "../settings/gameSettings.json" assert { type: "json" };

/**
 * This class is used to create an experience chart for a skill.
 * The chart is an array where each index represents a level and
 * the value at that index represents the total amount of experience
 * needed to reach that level.
 */
class ExperienceChart {
  #chart: Array<number> = [];

  #skillCap = gameSettings.game.maxPlayerLevel;
  #incrementRamp = 5;
  #lowerAdjust = 95;

  /**
   * Constructs a new ExperienceChart.
   * @param {ExperienceChartOptions} experienceChartOptions - Optional configuration for the experience chart.
   */
  constructor(experienceChartOptions?: ExperienceChartOptions) {
    this.#setExperienceChartOptions(experienceChartOptions); // override defaults with optional arguments
    this.#buildExperienceChart();

    this.#chart[this.#chart.length - 1] = Infinity;
  }

  //
  // getters/setters

  get chart(): Array<number> {
    return this.#chart;
  }
  // no setter for chart

  get skillCap(): number {
    return this.#skillCap;
  }
  set skillCap(skillCap: number) {
    if (skillCap < 1 || skillCap > gameSettings.game.maxPlayerLevel) {
      throw new Error(`Invalid skillCap (1 - ${gameSettings.game.maxPlayerLevel}).`);
    }
    this.#skillCap = skillCap;
    this.#buildExperienceChart();
  }

  get incrementRamp(): number {
    return this.#incrementRamp;
  }
  set incrementRamp(incrementRamp: number) {
    if (incrementRamp < 0) {
      throw new Error("Invalid incrementRamp. Cannot be less than 0.");
    }
    this.#incrementRamp = incrementRamp;
    this.#buildExperienceChart();
  }

  get lowerAdjust(): number {
    return this.#lowerAdjust;
  }
  set lowerAdjust(lowerAdjust: number) {
    if (lowerAdjust < 0) {
      throw new Error("Invalid lowerAdjust. Cannot be less than 0.");
    }
    this.#lowerAdjust = lowerAdjust;
    this.#buildExperienceChart();
  }

  //
  // experience chart functions

  /**
   * This method applies the options provided to the experience chart.
   * @param {ExperienceChartOptions} experienceChartOptions - The options to apply.
   */
  #setExperienceChartOptions(experienceChartOptions: ExperienceChartOptions = {}): void {
    const args = { ...experienceChartOptions };

    this.skillCap = args.skillCap ?? this.skillCap;
    this.incrementRamp = args.incrementRamp ?? this.incrementRamp;
    this.lowerAdjust = args.lowerAdjust ?? this.lowerAdjust;
  }

  /**
   * This method builds the experience chart.
   */
  #buildExperienceChart(): void {
    const initRamp = [];
    const experienceRamp = [];

    initRamp.push(this.incrementRamp);
    experienceRamp.push(this.incrementRamp);

    // reset and initialize the chart
    this.#chart = [this.incrementRamp + this.lowerAdjust];

    for (let i = 1; i < this.skillCap; i++) {
      initRamp.push(this.incrementRamp + initRamp[i - 1]);
      experienceRamp.push(experienceRamp[i - 1] + initRamp[i]);
      this.#chart.push(this.#chart[i - 1] + experienceRamp[i]);
    }
  }

  /**
   * This method retrieves the next cost for a given skill level.
   * @param {number} skillLevel - The skill level to get the next cost for.
   * @returns {number} The next cost.
   */
  nextCost(skillLevel: number): number {
    if (skillLevel > this.#chart.length || skillLevel < 1) {
      throw new Error(`Invalid skill level (1 - ${this.#chart.length})`);
    }

    return this.#chart[skillLevel - 1];
  }

  /**
   * This method calculates the total cost up to a given skill level.
   * @param {number} skillLevel - The skill level to calculate the total cost up to.
   * @returns {number} The total cost.
   */
  totalCostUpTo(skillLevel: number): number {
    if (skillLevel <= 1) {
      return 0;
    }

    const lastIndex = Math.min(skillLevel - 1, this.#chart.length - 1);
    return this.#chart.slice(0, lastIndex).reduce((acc, expCost) => acc + expCost, 0);
  }

  //
  // informational

  /**
   * This method logs the experience chart to the console.
   */
  toConsole(): void {
    let skillLevel = 1;

    this.chart.forEach((experience) => {
      console.log(`Skill level: ${skillLevel}: ${experience}`);
      skillLevel++;
    });
  }
}

/**
 * Represents optional configuration for an Experience Chart.
 */
type ExperienceChartOptions = Partial<{
  skillCap: number;
  incrementRamp: number;
  lowerAdjust: number;
}>;

export default ExperienceChart;
