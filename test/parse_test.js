var expect = chai.expect;

var invalidSinInputs = [
  null,
  undefined,
  {},
  true,
];

var invalidSinLengths = [
  "1a3456789",
  "12345678",
  "1234567891"
];

var invalidSinFormats = [
  "123456789",
  "123-456-789",
  " 123 456 789 "
];

var validSins = [
  " 130 692 544 ",
  "130-692-544",
  "130692544"
];

describe('SocialInsuranceNumber.parse', function() {
  it("returns an error object for an invalid input", function() {
    _.each(invalidSinInputs, function(input) {
      var sin = SocialInsuranceNumber.parse(input);
      expect(sin.valid).to.equal(false);
    });
  });

  it("returns an error object for an invalid format", function() {
    _.each(invalidSinFormats, function(input) {
      var sin = SocialInsuranceNumber.parse(input);
      expect(sin.valid).to.equal(false);
      expect(sin.error).to.equal("SIN format is invalid");
    });
  });

  it("returns an error object if the SIN value is not 9 digits long", function() {
    _.each(invalidSinLengths, function(input) {
      var sin = SocialInsuranceNumber.parse(input);
      expect(sin.valid).to.equal(false);
      expect(sin.error).to.equal("SIN must be 9 digits long");
    });
  });

  it("returns valid object for a valid format", function() {
    _.each(validSins, function(input) {
      var sin = SocialInsuranceNumber.parse(input);
      expect(sin.valid).to.equal(true);
      expect(sin.normalizedValue).to.equal("130692544");
      expect(sin.provinces).to.eql(['NB', 'NF', 'NS', 'PE']);
      expect(sin.temporaryResident).to.equal(false);
    });
  });

  it("sets temporaryResident to `true` for a temporary resident", function() {
    var sin = SocialInsuranceNumber.parse("918 640 897");
    expect(sin.valid).to.equal(true);
    expect(sin.normalizedValue).to.equal("918640897");
    expect(sin.provinces).to.eql([]);
    expect(sin.temporaryResident).to.equal(true);
  });
});
