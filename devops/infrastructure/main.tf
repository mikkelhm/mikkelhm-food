# Create a Resource Group
resource "azurerm_resource_group" "rg-mikkelhm-food" {
  name     = "mikkelhm-food"
  location = "westeurope"
}

# Create the Static Webapp
resource "azurerm_static_site" "ss-mikkelhm-food" {
  name                = "mikkelhm-food"
  resource_group_name = azurerm_resource_group.rg-mikkelhm-food.name
  location            = "West Europe"
}

# Create a custom domain in the Static Webapp
resource "azurerm_static_site_custom_domain" "cd-www-madsn-dk" {
  static_site_id  = azurerm_static_site.ss-mikkelhm-food.id
  domain_name     = "www.madsn.dk"
  validation_type = "dns-txt-token"
}

# Create a TXT record to verify the custom domain in Cloudflare
resource "cloudflare_record" "cf-txt-www-mikkelhm-food" {
  zone_id = var.cloudflare_zone_id
  name = "www.madsn.dk"
  value = azurerm_static_site_custom_domain.cd-www-madsn-dk.validation_token
  type = "TXT"
  ttl = 1
}

# Create the CNAME record for the domain that will point to the webapp default hostname
resource "cloudflare_record" "cf-cname-www-mikkelhm-food" {
  zone_id = var.cloudflare_zone_id
  name = "www"
  value = azurerm_static_site.ss-mikkelhm-food.default_host_name
  type = "CNAME"
  ttl = 1
}