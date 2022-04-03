## Azure
variable "azure_subscription_id" {
  description = "Subscription Id"
}

## Cloudflare
variable "cloudflare_zone_id" {
  description = "The zone Id defined in Cloudflare"
}

variable "cloudflare_api_token" {
    description = "Cloudflare api token to access the zone"
}