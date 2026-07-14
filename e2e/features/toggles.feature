Feature: Enable and disable toggles

  Scenario: Disabling the profile stops all modifications
    Given a profile "Main"
    And profile "Main" has request header "x-e2e-req" set to "1"
    When I visit the test page
    Then the document request carries header "x-e2e-req" with value "1"
    When I turn off the selected profile
    And I visit the test page
    Then the document request does not carry header "x-e2e-req"

  Scenario: Re-enabling the profile restores modifications
    Given a profile "Main"
    And profile "Main" is disabled
    And profile "Main" has request header "x-e2e-req" set to "1"
    When I visit the test page
    Then the document request does not carry header "x-e2e-req"
    When I turn on the selected profile
    And I visit the test page
    Then the document request carries header "x-e2e-req" with value "1"

  Scenario: Disabling a single header rule leaves other rules active
    Given a profile "Main"
    And profile "Main" has request header "x-one" set to "1"
    And profile "Main" has request header "x-two" set to "2"
    When I turn off the request header rule "x-one"
    And I visit the test page
    Then the document request carries header "x-two" with value "2"
    And the document request does not carry header "x-one"
