Feature: Importing settings gives the user feedback

  Background:
    Given a profile "Main"
    And profile "Main" has request header "x-old" set to "1"

  Scenario: A valid settings file reports success and its rules apply
    When I import a settings file containing:
      """
      {
        "profiles": [
          {
            "title": "Imported",
            "enabled": true,
            "useGlobalFilters": true,
            "requestHeaders": [{ "name": "x-new", "value": "2", "enabled": true }],
            "responseHeaders": []
          }
        ],
        "selectedProfileIndex": 0,
        "globalExcludeFilters": []
      }
      """
    Then the settings modal shows "✓ Settings imported"
    When I visit the test page
    Then the document request carries header "x-new" with value "2"
    And the document request does not carry header "x-old"

  Scenario: An invalid settings file reports failure and existing rules stay active
    When I import a settings file containing:
      """
      not json at all
      """
    Then the settings modal shows "✗ Import failed: not a valid settings JSON"
    When I visit the test page
    Then the document request carries header "x-old" with value "1"
