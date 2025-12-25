"use client";
import React from "react";

import Loading from "@/app/_components/common/Loading";
import MyModal from "@/app/_components/common/MyModal";
import SearchInput from "@/app/_components/common/SearchInput";
import { formatCurrency } from "@/utils/format.util";

interface AvailableDomainsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableDomains: any[];
  isLoadingDomains: boolean;
  isLoadingMemberDomains: boolean;
  pendingOperations: Set<number>;
  onAssignDomain: (domainId: number) => void;
  onSearch: (value: string) => void;
  selectedMemberUsername?: string;
  t: (key: string) => string;
}

const AvailableDomainsModal: React.FC<AvailableDomainsModalProps> = ({
  isOpen,
  onClose,
  availableDomains,
  isLoadingDomains,
  isLoadingMemberDomains,
  pendingOperations,
  onAssignDomain,
  onSearch,
  selectedMemberUsername,
  t,
}) => {
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Domain của team
          </h3>
        </div>
      }
      size="3xl"
      body={
        <div className="px-6 pb-6">
          {isLoadingMemberDomains ? (
            <div className="flex items-center justify-center py-8">
              <Loading />
              <span className="ml-3 text-gray-600">
                {t("modal.loadingDomains")}
              </span>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <SearchInput
                  placeholder="search domain..."
                  param="domain"
                  onSearch={onSearch}
                  isLoading={isLoadingDomains}
                />
              </div>
              {availableDomains.length > 0 ? (
                <div className="space-y-2">
                  {availableDomains.map((domain: any) => (
                    <div
                      key={domain.id}
                      className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {domain.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {domain.type} • {t("modal.budgetLabel")} $
                            {formatCurrency(domain.budget) ||
                              t("modal.notAvailable")}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAssignDomain(domain.id)}
                        disabled={pendingOperations.has(domain.id)}
                        className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        {pendingOperations.has(domain.id)
                          ? t("modal.assigningButton")
                          : t("modal.assignButton")}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                  <p className="text-gray-500">
                    {t("modal.noAvailableDomains") || "No available domains"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      }
    />
  );
};

export default AvailableDomainsModal;
