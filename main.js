// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum: number,
    dna: dnaArray,
    mutate() {
      //randomly select a base in the dna array
      var indexToMutate = Math.floor(Math.random() * this.dna.length);
      var originalBase = this.dna[indexToMutate];
      //change it to one of the three options it isn't already
      while (this.dna[indexToMutate] == originalBase) {
        this.dna[indexToMutate] = returnRandBase();
      }
      return this.dna;
    },
    compareDNA(otherpAequor) {
      //compare dna of this pAequor to that of the object passed in
      const strandToCompare = otherpAequor.dna;
      //print out a message stating the percentage of shared DNA between the two
      //shared means same bases, in the same positions
      var sharedCount = 0;
      for (let i = 0; i < this.dna.length - 1; i++) {
        if (this.dna[i] == strandToCompare[i]) {
          sharedCount ++;
        }
      }
      var percentageShared = (sharedCount / this.dna.length) * 100;
      return percentageShared;
    },
    willLikelySurvive() {
      //paequors are more likely to survive if their DNA contains more than 60% C and G bases
      var survivalCount = 0;
      this.dna.forEach(base => {
        if (base == 'C' || base == 'G') {
          survivalCount ++;
        }
      });
      var survivalPercentage = (survivalCount / this.dna.length) * 100;
      if (survivalPercentage > 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      var complementaryStrand = [];
      this.dna.forEach(base => {
        switch (base) {
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'C':
            complementaryStrand.push('G');
            break;
          case 'G':
            complementaryStrand.push('C');
            break;
          default:
            break;
        }
      });
      return complementaryStrand;
    }
  }
};

const mostRelated = (organismArray) => {
  var currentMost = [organismArray[0], organismArray[1]];
  for (let i = 0; i < organismArray.length; i++) {
    const thisCompare = organismArray[i];
    for (let j = 0; j < organismArray.length; j++) {
      const thatCompare = organismArray[j];
      if (thisCompare.compareDNA(thatCompare) > currentMost[0].compareDNA(currentMost[1]) && i != j) {
        currentMost = [thisCompare, thatCompare];
      }
    }
  }
  return currentMost;
}

var successfulOrganisms = [];
var counter = 1;
while (successfulOrganisms.length < 30) {
  var newPaequor = pAequorFactory(counter, mockUpStrand());
  if (newPaequor.willLikelySurvive()) {
    successfulOrganisms.push(newPaequor);
  }
  counter++;
}

const printRelatives = () => {
  const closestRelatives = mostRelated(successfulOrganisms);
  console.log(`Out of the 30 most successful organisms stored, specimen numbers ${closestRelatives[0].specimenNum} 
    and ${closestRelatives[1].specimenNum} are the closest related; sharing ${closestRelatives[0].compareDNA(closestRelatives[1])}% 
    of their DNA.`);
}

printRelatives();
