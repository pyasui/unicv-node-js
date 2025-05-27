class Team {
  constructor({ id, name, shortName, tla, crest, founded, clubColors, venue }) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.tla = tla;
    this.crest = crest;
    this.founded = founded;
    this.clubColors = clubColors;
    this.venue = venue;
  }
}

module.exports = Team;