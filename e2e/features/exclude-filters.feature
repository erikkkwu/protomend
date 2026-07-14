Feature: Global exclude filters exempt matching requests

  Background:
    Given a profile "Main"
    And profile "Main" has request header "x-e2e-req" set to "1"

  Scenario: Requests matching a filter are exempt, others are modified
    Given a global exclude filter ".*/excluded/.*"
    When I visit the test page
    And the page fetches "/excluded/api"
    And the page fetches "/api"
    Then the request to "/api" carries header "x-e2e-req"
    And the request to "/excluded/api" does not carry header "x-e2e-req"

  Scenario: A disabled filter exempts nothing
    Given a global exclude filter ".*/excluded/.*"
    When I disable the exclude filter ".*/excluded/.*" in settings
    And I visit the test page
    And the page fetches "/excluded/api"
    Then the request to "/excluded/api" carries header "x-e2e-req"

  Scenario: A profile that opts out of global filters ignores them
    Given a global exclude filter ".*/excluded/.*"
    When I turn off global filters for the selected profile
    And I visit the test page
    And the page fetches "/excluded/api"
    Then the request to "/excluded/api" carries header "x-e2e-req"

  Scenario: Document requests matching a filter are exempt
    Given a global exclude filter ".*/plain.*"
    When I visit the test page
    Then the document request does not carry header "x-e2e-req"
