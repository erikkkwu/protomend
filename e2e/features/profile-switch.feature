Feature: Switching profiles applies the selected profile's rules

  Background:
    Given a profile "A"
    And profile "A" has request header "x-a" set to "1"
    And a profile "B"
    And profile "B" has request header "x-b" set to "2"
    And profile "A" is selected

  Scenario: Switching applies the new profile's rules and removes the old ones
    When I switch to profile "B"
    And I visit the test page
    Then the document request carries header "x-b" with value "2"
    And the document request does not carry header "x-a"

  Scenario: Switching to a disabled profile applies nothing
    Given profile "B" is disabled
    When I switch to profile "B"
    And I visit the test page
    Then the document request does not carry header "x-b"
    And the document request does not carry header "x-a"
