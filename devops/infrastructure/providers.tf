terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.93.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
  backend "azurerm" {}

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  subscription_id = var.azure_subscription_id
  features {}
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}