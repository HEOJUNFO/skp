# @author : 
PLATFORM    :=$(shell uname -a)
CMD_SUDO    :=$(shell which sudo)
CMD_RM      :=$(shell which rm)
CMD_STRIP   :=$(shell which strip)
CMD_DIFF    :=$(shell which diff)
CMD_SUDO    :=$(shell which sudo)
CMD_RM      :=$(shell which rm)
CMD_CP      :=$(shell which cp)
CMD_CD      :=$(shell which cd)
CMD_MV      :=$(shell which mv)
CMD_TAIL    :=$(shell which tail)
CMD_FIND    :=$(shell which find)
CMD_CURL    :=$(shell which curl)
CMD_MKDIR   :=$(shell which mkdir)
CMD_TEST    :=$(shell which test)
CMD_PATCH	:=$(shell which patch)
CMD_SLEEP	:=$(shell which sleep)
CMD_SYNC	:=$(shell which sync)
CMD_LN		:=$(shell which	ln)
CMD_NODE	:=$(shell which	node)
CMD_NPM		:=$(shell which	npm)
CMD_YARN	:=$(shell which	yarn)
CMD_BOWER	:=$(shell which	bower)
CMD_GRUNT	:=$(shell which	grunt)
CMD_TAR		:=$(shell which tar)
CMD_ZIP		:=$(shell which	zip)
CMD_MD5DUM	:=$(shell which md5sum)
TODAY		:=$(shell date +%Y.%m.%d)
BUILD_NO	?=test
PKG_ADREPORT_NAME	?=adreport-fe_$(BUILD_NO)-$(TODAY).zip
PATH=/app/git/bin:/app/node/bin/:/app/python/bin/:/app/gradle/bin:/app/ruby/bin/:/app/jdk/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/local/node/bin/:/usr/bin/:/bin/:/sbin/:/usr/sbin/:/app/yarn/bin/:/app/phantomjs/bin/

all:: clean adreport
clean::
	@echo -n -e "Cleaning Previusly objects.."
	@$(CMD_RM) -f *.so* *.o core.* gmon.* tmp/* bin/* lib/*.a lib/*.so*
	@$(CMD_RM) -rf dist packages
	@echo -e ""
	@echo -e "Current node version:"
	@$(CMD_NODE) -v
	@echo -e "Current yarn version:"
	@$(CMD_YARN) --version
	@echo -n -e "Complete..."

pkginstall::
	@echo -e ""
	@echo -e "Package Install.."
	@echo -e "Start bower install:"
	@$(CMD_BOWER) install
	@echo -e "Start yarn install:"
	@$(CMD_YARN) install --ignore-engines --ignore-optional
	@echo -n -e "Complete..."

adreport: clean pkginstall
	@echo -e ""
	@echo -e "Build.."
	@$(CMD_MKDIR) -p packages
	@echo -e ""
	@$(CMD_GRUNT) build:adreport
	@echo -e ""
	@(cd dist/adreport && $(CMD_ZIP) -r - *) > packages/$(PKG_ADREPORT_NAME)
	@echo -e ""
	@$(CMD_MD5DUM) packages/$(PKG_ADREPORT_NAME) > packages/$(PKG_ADREPORT_NAME).md5
	@echo -e ""
	@echo -n -e "Complete..."
