Feature: Header rules apply to network traffic

  Header modifications must take effect on real traffic, for both the
  document (main_frame) request and subresource requests. The document
  response is observed through its user-visible effect (a cookie set by
  an injected Set-Cookie header), because DevTools-protocol snapshots do
  not reflect declarativeNetRequest response modifications.

  Background:
    Given a profile "Main"

  Scenario: Request header is applied to the document request
    Given profile "Main" has request header "x-e2e-req" set to "doc-1"
    When I visit the test page
    Then the document request carries header "x-e2e-req" with value "doc-1"

  Scenario: Request header is applied to subresource requests
    Given profile "Main" has request header "x-e2e-req" set to "sub-1"
    When I visit the test page
    And the page fetches "/api"
    Then the subresource request carries header "x-e2e-req" with value "sub-1"

  Scenario: Response header is applied to the document response
    Given profile "Main" has response header "set-cookie" set to "reheader-e2e=doc"
    When I visit the test page
    Then the document response sets cookie "reheader-e2e=doc"

  Scenario: Response header is applied to subresource responses
    Given profile "Main" has response header "x-e2e-resp" set to "sub-2"
    When I visit the test page
    And the page fetches "/api"
    Then the subresource response carries header "x-e2e-resp" with value "sub-2"

  Scenario: An empty value removes the header from the request
    Given profile "Main" removes request header "accept-language"
    When I visit the test page
    Then the document request does not carry header "accept-language"

  Scenario: An empty value removes the header from the response
    Given profile "Main" removes response header "x-server-tag"
    When I visit the test page
    And the page fetches "/api"
    Then the subresource response does not carry header "x-server-tag"
